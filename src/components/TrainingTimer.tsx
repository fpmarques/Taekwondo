import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, AlertTriangle, Zap, Volume2, VolumeX, ShieldAlert } from 'lucide-react';

export default function TrainingTimer() {
  const [rounds, setRounds] = useState<number>(10);
  const [intervalSec, setIntervalSec] = useState<number>(3); // time to perform work
  const [prepSec, setPrepSec] = useState<number>(5); // setup transition time
  
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [phase, setPhase] = useState<'idle' | 'prep' | 'work' | 'finished'>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [flash, setFlash] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play a brief synth beep to help users pacing their kicks while looking away from the phone!
  const playBeep = (freq: number, duration: number) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("AudioContext init error:", e);
    }
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Flash on change
            setFlash(true);
            setTimeout(() => setFlash(false), 200);

            if (phase === 'prep') {
              // Transition to work!
              playBeep(880, 0.35); // High beep
              setPhase('work');
              return intervalSec;
            } else if (phase === 'work') {
              // Work is done!
              const nextRound = currentRound + 1;
              if (nextRound >= rounds) {
                // Done!
                playBeep(440, 0.8); // Long finished buzz
                setIsActive(false);
                setPhase('finished');
                return 0;
              } else {
                // Next round!
                playBeep(523, 0.2); // Low prep beep
                setCurrentRound(nextRound);
                setPhase('prep');
                return prepSec;
              }
            }
          }
          // Regular ticking alerts
          if (prev <= 3 && soundEnabled) {
            playBeep(659, 0.1); // mid key tick
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, phase, currentRound, rounds, intervalSec, prepSec, soundEnabled]);

  const startTraining = () => {
    // Resume audio context to allow sounds on iOS/Safari
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    } catch {}

    setCurrentRound(0);
    setPhase('prep');
    setTimeLeft(prepSec);
    setIsActive(true);
    playBeep(523, 0.2);
  };

  const stopTraining = () => {
    setIsActive(false);
    setPhase('idle');
    setCurrentRound(0);
    setTimeLeft(0);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // Beep briefly to test
    if (!soundEnabled) {
      setTimeout(() => playBeep(600, 0.1), 100);
    }
  };

  return (
    <div id="assistente-metronomo" className="border-2 border-black bg-white p-5 font-mono text-black">
      {/* Title */}
      <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
        <h3 className="font-bold tracking-tight text-sm uppercase flex items-center gap-2">
          <Clock size={16} />
          <span>METRÔNOMO DE REPETIÇÃO // TREINAR SÓ</span>
        </h3>
        <button
          onClick={toggleSound}
          id="btn-sound-toggle"
          className={`px-3 py-1 text-xs border border-black flex items-center gap-1.5 transition-colors duration-100 ${
            soundEnabled ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-100'
          }`}
        >
          {soundEnabled ? (
            <>
              <Volume2 size={13} />
              <span>ÁUDIO LIGADO</span>
            </>
          ) : (
            <>
              <VolumeX size={13} />
              <span>MUDO</span>
            </>
          )}
        </button>
      </div>

      {/* Main Grid: Control / Display splitting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Side: Setup parameters */}
        <div className="space-y-4">
          <div className="text-xs text-neutral-500 max-w-sm">
            Dispare sequências de áudio ou visuais automáticas para praticar no seu Dojang residencial sem precisar tocar o celular toda hora.
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                Repetições:
              </label>
              <div className="flex border border-black overflow-hidden">
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={rounds}
                  onChange={(e) => setRounds(Math.max(1, parseInt(e.target.value) || 1))}
                  disabled={isActive}
                  className="w-full text-center py-1 text-sm bg-white border-none focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                Ataque (s):
              </label>
              <div className="flex border border-black overflow-hidden">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={intervalSec}
                  onChange={(e) => setIntervalSec(Math.max(1, parseInt(e.target.value) || 1))}
                  disabled={isActive}
                  className="w-full text-center py-1 text-sm bg-white border-none focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                Preparo (s):
              </label>
              <div className="flex border border-black overflow-hidden">
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={prepSec}
                  onChange={(e) => setPrepSec(Math.max(1, parseInt(e.target.value) || 1))}
                  disabled={isActive}
                  className="w-full text-center py-1 text-sm bg-white border-none focus:outline-none focus:ring-0"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            {!isActive && phase === 'idle' && (
              <button
                onClick={startTraining}
                id="btn-training-start"
                className="flex-1 bg-black text-white hover:bg-neutral-800 transition-colors duration-100 py-2.5 text-xs font-bold uppercase tracking-wider border-2 border-black"
              >
                INICIAR CICLO DE CHUTES
              </button>
            )}
            
            {isActive && (
              <button
                onClick={() => setIsActive(false)}
                id="btn-training-pause"
                className="flex-1 bg-neutral-100 text-black hover:bg-neutral-200 transition-colors duration-100 py-2.5 text-xs font-bold uppercase tracking-wider border border-black"
              >
                PAUSAR
              </button>
            )}

            {!isActive && phase !== 'idle' && phase !== 'finished' && (
              <button
                onClick={() => setIsActive(true)}
                id="btn-training-resume"
                className="flex-1 bg-black text-white hover:bg-neutral-800 transition-colors duration-100 py-2.5 text-xs font-bold uppercase tracking-wider border-2 border-black"
              >
                RETOMAR
              </button>
            )}

            {phase !== 'idle' && (
              <button
                onClick={stopTraining}
                id="btn-training-reset"
                className="p-2.5 hover:bg-neutral-100 transition-colors border border-black"
                title="Resetar"
              >
                <RotateCcw size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Training Timer Blueprint Display Panel */}
        <div className={`border-2 border-black p-4 flex flex-col justify-center items-center h-44 relative overflow-hidden transition-all duration-200 ${
          flash ? 'bg-black text-white' : 'bg-neutral-50 text-black'
        }`}>
          {/* Watermarks style */}
          <div className="absolute top-1.5 left-2.5 text-[8px] text-neutral-400 font-bold tracking-widest uppercase">
            STATUS DO CICLO
          </div>
          {phase !== 'idle' && (
            <div className="absolute top-1.5 right-2.5 text-[8px] text-neutral-400 font-bold tracking-widest uppercase">
              REPETIÇÕES: 0{currentRound + 1} / 0{rounds}
            </div>
          )}

          {phase === 'idle' && (
            <div className="text-center">
              <Zap size={24} className="mx-auto text-neutral-300 mb-2 animate-bounce" />
              <div className="text-xs font-bold uppercase tracking-wider">Metrônomo Prontidão</div>
              <div className="text-[10px] text-neutral-400">Configure os tempos e posicione o celular no tatame!</div>
            </div>
          )}

          {phase === 'prep' && (
            <div className="text-center font-bold">
              <div className="text-[10px] text-neutral-400 tracking-wider uppercase mb-1">PREPARE-SE // JUNBI</div>
              <div className={`text-5xl tracking-tighter ${flash ? 'text-white' : 'text-neutral-800'}`}>
                {timeLeft}s
              </div>
              <div className="text-[9px] text-neutral-500 uppercase mt-1 animate-pulse">Retome postura de guarda...</div>
            </div>
          )}

          {phase === 'work' && (
            <div className="text-center font-bold">
              <div className="text-[10px] text-neutral-600 tracking-widest uppercase mb-1 font-bold animate-pulse text-red-600 flex items-center justify-center gap-1">
                <ShieldAlert size={12} className="inline" />
                <span>KIHAP / GOLPEIE AGORA!</span>
              </div>
              <div className="text-6xl tracking-widest font-black text-black">
                {timeLeft}
              </div>
              <div className="text-[9px] text-neutral-500 uppercase mt-1">Efetue a técnica máxima!</div>
            </div>
          )}

          {phase === 'finished' && (
            <div className="text-center">
              <div className="text-xs font-bold text-neutral-800 tracking-wider uppercase mb-1">TREINAMENTO CONCLUÍDO!</div>
              <div className="text-xl font-bold uppercase border-y border-black py-1.5 my-1 tracking-widest bg-white text-black px-4">
                PILTONG // EXCELENTE
              </div>
              <button
                onClick={stopTraining}
                className="text-[9px] text-neutral-500 underline uppercase mt-1.5 block mx-auto hover:text-black hover:font-bold"
              >
                Voltar ao painel inicial
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
