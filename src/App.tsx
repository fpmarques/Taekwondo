import React, { useState, useEffect } from 'react';
import { 
  Search, CheckSquare, Square, Award, Info, BookOpen, 
  ChevronDown, ChevronUp, RefreshCw, SlidersHorizontal, 
  Trash2, HelpCircle, Activity, FileText, Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { TECHNIQUES, GLOSSARY } from './data';
import { BeltColor, TechniqueCategory, Technique } from './types';
import SchematicVisualizer from './components/SchematicVisualizer';
import TrainingTimer from './components/TrainingTimer';

export default function App() {
  // --- TABS & NAVIGATION ---
  // Active tabs: 'inicio' | 'movimentos' | 'poomsae' | 'glossario' | 'sobre'
  const [activeTab, setActiveTab] = useState<'inicio' | 'movimentos' | 'poomsae' | 'glossario' | 'sobre'>('inicio');

  // --- STATE ---
  const [selectedBelt, setSelectedBelt] = useState<'all' | BeltColor>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | TechniqueCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [completedList, setCompletedList] = useState<Record<string, boolean>>({});
  
  // UI States
  const [expandedMasterTip, setExpandedMasterTip] = useState<Record<string, boolean>>({});
  const [searchTermGlossary, setSearchTermGlossary] = useState<string>('');

  // --- LOCALSTORAGE LOAD ---
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tkd_course_checklist');
      if (stored) {
        setCompletedList(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read localStorage:', e);
    }
  }, []);

  // --- CHECKBOX TOGGLE ---
  const toggleCompleted = (id: string) => {
    const updated = {
      ...completedList,
      [id]: !completedList[id]
    };
    setCompletedList(updated);
    try {
      localStorage.setItem('tkd_course_checklist', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not write to localStorage:', e);
    }
  };

  // --- RESET ALL PROGRESS ---
  const resetAllProgress = () => {
    if (window.confirm('Tem certeza de que deseja zerar todo o seu progresso de aprendizado? Esta ação não pode ser desfeita.')) {
      setCompletedList({});
      try {
        localStorage.setItem('tkd_course_checklist', JSON.stringify({}));
      } catch (e) {
        console.warn('Could not reset localStorage:', e);
      }
    }
  };

  // --- TOGGLE MASTER TIPS ---
  const toggleMasterTipExpanded = (id: string) => {
    setExpandedMasterTip(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // --- CALCULATE PROGRESS STATS ---
  const getSubListByBelt = (belt: BeltColor) => TECHNIQUES.filter(t => t.belt === belt);
  
  const whiteBeltTechs = getSubListByBelt('white');
  const yellowBeltTechs = getSubListByBelt('yellow');
  const greenBeltTechs = getSubListByBelt('green');

  const getCompletedCount = (techs: Technique[]) => techs.filter(t => completedList[t.id]).length;

  const whiteCompleted = getCompletedCount(whiteBeltTechs);
  const yellowCompleted = getCompletedCount(yellowBeltTechs);
  const greenCompleted = getCompletedCount(greenBeltTechs);
  const totalCompleted = getCompletedCount(TECHNIQUES);

  const whitePercent = whiteBeltTechs.length ? Math.round((whiteCompleted / whiteBeltTechs.length) * 100) : 0;
  const yellowPercent = yellowBeltTechs.length ? Math.round((yellowCompleted / yellowBeltTechs.length) * 100) : 0;
  const greenPercent = greenBeltTechs.length ? Math.round((greenCompleted / greenBeltTechs.length) * 100) : 0;
  const totalPercent = TECHNIQUES.length ? Math.round((totalCompleted / TECHNIQUES.length) * 100) : 0;

  // --- FILTERING LOGIC ---
  const filteredTechniques = TECHNIQUES.filter((tech) => {
    // 1. Filter by Belt
    if (selectedBelt !== 'all' && tech.belt !== selectedBelt) {
      return false;
    }
    // 2. Filter by Category
    if (selectedCategory !== 'all' && tech.category !== selectedCategory) {
      return false;
    }
    // 3. Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = tech.nameKr.toLowerCase().includes(q);
      const matchPt = tech.namePt.toLowerCase().includes(q);
      const matchHangul = tech.nameHangul.includes(q);
      const matchGup = tech.gup.toLowerCase().includes(q);
      const matchIntro = tech.intro.toLowerCase().includes(q);
      if (!matchName && !matchPt && !matchHangul && !matchGup && !matchIntro) {
        return false;
      }
    }
    return true;
  });

  // Filter glossary
  const filteredGlossary = GLOSSARY.filter(item => {
    if (searchTermGlossary.trim() === '') return true;
    const q = searchTermGlossary.toLowerCase();
    return item.term.toLowerCase().includes(q) || item.meaning.toLowerCase().includes(q);
  });

  // Category Translation Map
  const categoryLabels: Record<TechniqueCategory, string> = {
    stance: 'Sôgui (Bases)',
    defense: 'Makki (Defesas)',
    attack: 'Chigi/Jireugi (Ataques)',
    kick: 'Chagi (Chutes)',
    poomsae: 'Poomsae (Formas)'
  };

  // Belt Label Mapping
  const beltMap: Record<BeltColor, { label: string; code: string; borderStyle: string }> = {
    white: { label: 'Faixa Branca (10º Gup)', code: 'BR', borderStyle: 'border-neutral-300' },
    yellow: { label: 'Faixa Amarela (9º e 8º Gup)', code: 'AM', borderStyle: 'border-neutral-400 double' },
    green: { label: 'Faixa Verde (7º e 6º Gup)', code: 'VD', borderStyle: 'border-neutral-600' }
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans pb-16 flex flex-col selection:bg-neutral-900 selection:text-white">
      
      {/* ==========================================
          TOP NAVIGATION BAR (Strict Image-replica)
          ========================================== */}
      <nav id="top-navbar" className="w-full bg-white py-6 px-6 md:px-12 flex justify-between items-center border-b border-neutral-100 sticky top-0 z-50">
        {/* Invisible left spacer to align menu correctly to the right as in the attachment */}
        <div className="hidden md:flex items-center gap-2">
          <span className="font-bold text-sm tracking-widest font-mono text-neutral-800 uppercase">
            TAEKWONDO
          </span>
        </div>
        
        {/* Navigation items aligned to the right */}
        <div className="flex flex-wrap md:flex-nowrap gap-x-4 md:gap-x-8 gap-y-2 ml-auto text-[11px] md:text-xs font-bold tracking-widest uppercase">
          {(['inicio', 'movimentos', 'poomsae', 'glossario', 'sobre'] as const).map((tab) => {
            const isActive = activeTab === tab;
            const labelsMap = {
              inicio: 'Início',
              movimentos: 'Movimentos',
              poomsae: 'Poomsae',
              glossario: 'Glossário',
              sobre: 'Sobre'
            };
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  // Resets basic filter configurations on tab change for smoother navigation
                  if (tab === 'poomsae') {
                    setSelectedCategory('poomsae');
                  } else if (tab === 'movimentos') {
                    setSelectedCategory('all');
                  }
                }}
                id={`nav-link-${tab}`}
                className="relative py-1 cursor-pointer transition-colors text-black hover:opacity-100 opacity-90 focus:outline-none"
              >
                <span>{labelsMap[tab]}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ==========================================
          DYNAMIC VIEWPORT CONTAINER
          ========================================== */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'inicio' && (
            <motion.div
              key="inicio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center justify-center px-4 py-8 md:py-16 overflow-hidden bg-white"
            >
              <div className="max-w-5xl w-full flex flex-col items-center">
                
                {/* 
                  ====================================================
                  CENTERPIECE illustration: Hand-drawn Coiled Belt
                  and Kick Fighter Replica (Dynamic and Responsive SVG)
                  ====================================================
                */}
                <div className="relative w-full max-w-[850px] aspect-[1.85] flex items-center justify-center select-none mb-4 bg-white">
                  
                  {/* The high-fidelity watercolor/ink sketch built with fluid brush-style vector paths */}
                  <svg 
                    viewBox="0 0 1000 500" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  >
                    {/* Definitions for gradients and drop shadows */}
                    <defs>
                      <filter id="ink-wash" x="-10%" y="-10%" width="120%" height="120%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* BACKGROUND INK WASH SHADOWS (Watercolor aesthetics) */}
                    <g filter="url(#ink-wash)" opacity="0.12" fill="#1c1917">
                      <ellipse cx="500" cy="270" rx="420" ry="180" />
                      <ellipse cx="760" cy="380" rx="120" ry="60" />
                      <path d="M 120,200 Q 30,120 70,380 T 200,440 T 600,440 T 880,310 T 720,120 Z" />
                    </g>

                    {/* COILED BELT (Thick, textured, organic hand-inked brushes) */}
                    <g stroke="#1c1917" strokeLinecap="round" strokeLinejoin="round" fill="none">
                      {/* Outer fuzzy sketch lines (mimics soft pencil under-sketches) */}
                      <path d="M 60,250 C 40,140 160,80 320,65 C 480,50 720,70 850,110 C 960,145 980,240 920,310 C 860,380 720,440 520,460 C 320,480 140,430 80,340 C 50,295 55,270 60,250 Z" strokeWidth="1" strokeDasharray="15 3 5 4" opacity="0.35" />
                      <path d="M 62,252 C 42,142 162,82 322,67 C 482,52 722,72 852,112 C 962,147 982,242 922,312 C 862,382 722,442 522,462 C 322,482 142,432 82,342" strokeWidth="0.75" opacity="0.5" />

                      {/* Main thick belt wraps (layered to look like a thick canvas strap) */}
                      {/* Left side curve with thickness folds */}
                      <path d="M 60,250 C 40,160 140,100 280,85 C 420,70 680,90 850,130 C 940,150 960,220 920,280 C 890,325 780,380 600,420 C 420,460 250,460 140,420 C 80,395 55,310 60,250 Z" strokeWidth="3.5" />
                      
                      {/* Filled white belt base to cover overlapping rear lines */}
                      <path d="M 60,250 C 40,160 140,100 280,85 C 420,70 680,90 850,130 C 940,150 960,220 920,280 C 890,325 780,380 600,420 C 420,460 250,460 140,420 C 80,395 55,310 60,250 Z" fill="#ffffff" />
                      
                      {/* Inner border stitch-lines along the belt */}
                      <path d="M 70,250 C 52,170 145,110 280,95 C 415,80 670,100 835,138 C 920,158 940,218 905,270" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
                      <path d="M 73,252 C 55,172 148,112 283,97 C 418,82 673,102 838,140 C 923,160 943,220 908,272" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.6" />
                      <path d="M 50,255 C 32,155 135,90 275,75 C 415,60 675,80 845,122 C 930,142 950,212 915,262" strokeWidth="1" strokeDasharray="4 3" opacity="0.7" />

                      {/* Right hand massive knot structure */}
                      <g fill="none" strokeWidth="3" stroke="#1c1917">
                        {/* Shadow wash inside the knot */}
                        <path d="M 720,310 C 700,280 750,260 780,290 C 810,320 840,360 830,390 C 820,410 770,410 740,360 Z" fill="#fafafa" />
                        {/* Knot layers */}
                        <path d="M 720,310 C 695,290 735,265 765,285 C 795,305 825,345 815,385 C 805,405 765,405 735,355 Z" strokeWidth="3.5" />
                        <path d="M 710,315 C 690,300 725,275 755,295 C 785,315 815,355 805,395" strokeWidth="1.5" />
                        <path d="M 730,315 C 720,330 725,360 740,380" strokeWidth="2" strokeDasharray="2 2" />
                        <path d="M 740,300 C 760,290 790,310 800,340 C 810,370 780,395 760,395" strokeWidth="1.5" strokeDasharray="3 1" />
                        
                        {/* Floating end strip 1 (curving backward underneath) */}
                        <path d="M 790,360 C 810,430 890,443 928,452" strokeWidth="4.5" />
                        <path d="M 790,360 C 810,430 890,443 928,452" fill="#ffffff" />
                        <path d="M 788,364 C 808,434 888,447 926,456" strokeWidth="1.5" />
                        <path d="M 795,358 C 815,428 895,441 933,450" strokeWidth="1" strokeDasharray="3 2" />
                        <path d="M 785,365 C 805,435 885,448 923,457" strokeWidth="1" strokeDasharray="2 3" />
                        
                        {/* Floating end strip 2 (curving to left/bottom) */}
                        <path d="M 740,370 C 710,460 610,470 514,475" strokeWidth="4.5" />
                        <path d="M 740,370 C 710,460 610,470 514,475" fill="#ffffff" />
                        <path d="M 738,374 C 708,464 608,474 512,479" strokeWidth="1.5" />
                        <path d="M 743,368 C 713,458 613,468 517,473" strokeWidth="1.2" strokeDasharray="3 2" />
                        <path d="M 735,372 C 705,462 605,472 509,477" strokeWidth="0.8" strokeDasharray="1 3" />

                        {/* Knot details & fabric lines */}
                        <path d="M 750,330 C 730,340 735,370 745,390" strokeWidth="1" />
                        <path d="M 770,305 C 760,335 765,365 778,380" strokeWidth="1.5" />
                        <path d="M 785,315 C 780,345 788,365 798,375" strokeWidth="1" />
                      </g>

                      {/* Organic hatching inside the coiled space */}
                      <path d="M 110,210 C 100,240 105,270 120,300" strokeWidth="1.2" opacity="0.4" />
                      <path d="M 115,208 C 105,238 110,268 125,298" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.3" />
                      <path d="M 870,200 C 885,230 880,260 865,290" strokeWidth="1.2" opacity="0.4" />
                      <path d="M 875,198 C 890,228 885,258 870,288" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.3" />
                    </g>

                    {/* DYNAMIC INK SPLATTERS AND SPECKLES (Gives genuine watercolor look) */}
                    <g fill="#1c1917" opacity="0.75">
                      <circle cx="178" cy="275" r="2.5" />
                      <circle cx="225" cy="285" r="1.5" />
                      <circle cx="168" cy="305" r="1" />
                      <circle cx="218" cy="318" r="2" />
                      <circle cx="780" cy="180" r="1.8" />
                      <circle cx="830" cy="210" r="1.2" />
                      <circle cx="810" cy="245" r="2" />
                      <circle cx="850" cy="265" r="1.5" />
                      <circle cx="510" cy="98" r="1.5" />
                      <circle cx="430" cy="88" r="2" />
                      <circle cx="452" cy="74" r="1" />
                      <circle cx="340" cy="74" r="1.5" />
                    </g>

                    {/* 
                      ====================================================
                      THE ARTISTIC FIGHTER (Launches side kick Yop Chagi)
                      - Drawn with gorgeous, anatomically faithful ink brush silhouettes.
                      - Uses closed, organic white dobok fills and thick ink outlines.
                      ====================================================
                    */}
                    <g transform="translate(15, -15) scale(1.02)">
                      {/* FIGHTER BODY SHADOW (Watercolor soft stain back layer) */}
                      <path 
                        d="M 335,115 C 342,108 355,115 360,125 C 365,135 355,145 348,150 C 340,155 330,150 335,115 Z M 325,145 C 300,150 310,165 315,180 C 322,185 335,190 350,175 C 352,170 355,160 348,150 Z M 350,175 C 370,150 440,115 480,95 C 496,85 500,90 495,105 C 485,115 440,145 370,185 Z M 345,178 L 358,245 L 368,270 L 355,273 L 340,245 Z" 
                        fill="#1c1917" 
                        opacity="0.08" 
                        filter="url(#ink-wash)"
                      />

                      {/* WHITE DOBOK FILL PANELS (Ensures solid presence over belt back lines) */}
                      {/* Support leg trousers */}
                      <path d="M 345,175 L 358,245 C 362,255 365,263 368,266 C 362,268 350,268 344,264 L 336,242 L 328,195 Z" fill="#ffffff" />
                      {/* Torso & dobok jacket */}
                      <path d="M 326,145 C 308,148 312,165 318,178 C 325,185 336,190 352,172 L 356,155 Z" fill="#ffffff" />
                      {/* Extended kicking leg trousers (loose fabric drape folds) */}
                      <path d="M 354,153 L 428,122 C 438,118 440,126 442,130 L 444,136 L 366,176 Z" fill="#ffffff" />

                      {/* DOBOK DETAIL CONTROLS & BRUSH STROKES */}
                      <g stroke="#1c1917" strokeLinecap="round" strokeLinejoin="round" fill="none">
                        {/* Dynamic support leg contour (loose fits canvas) */}
                        <path d="M 328,198 L 336,242 L 344,264" strokeWidth="2.5" />
                        <path d="M 345,175 L 358,245 C 362,255 365,263 368,266" strokeWidth="3" />
                        {/* Creases and fabric folds in support leg */}
                        <path d="M 338,205 C 344,215 342,230 346,245" strokeWidth="1.2" opacity="0.8" />
                        <path d="M 330,225 C 336,232 338,242 340,250" strokeWidth="1.2" opacity="0.7" />
                        <path d="M 348,220 C 352,230 354,242 358,255" strokeWidth="1" opacity="0.6" />
                        {/* Support Foot (Bare, rooted, ready to pivot) */}
                        <path d="M 368,266 L 372,274 C 374,277 368,279 360,279 C 353,279 342,277 344,272" strokeWidth="2.8" />
                        <path d="M 358,271 L 368,271" strokeWidth="1.2" />

                        {/* Extended kicking leg trousers contour - loose folds drape */}
                        <path d="M 354,153 L 428,122 C 436,118 440,122 443,126 L 444,136 L 366,176" strokeWidth="3.2" />
                        {/* Creases and tension folds in kicking leg */}
                        <path d="M 374,158 C 392,148 412,138 428,132" strokeWidth="1.5" opacity="0.8" />
                        <path d="M 368,168 C 388,155 408,145 432,135" strokeWidth="1.2" opacity="0.75" />
                        <path d="M 390,158 C 405,150 420,142 438,138" strokeWidth="0.8" strokeDasharray="3 1" />

                        {/* Extended Kicking Leg (Foot blade - Yop Chagi / side kick projection) */}
                        {/* Highly stylized powerful foot and vector heel shape */}
                        <path d="M 438,124 L 486,101" strokeWidth="4.5" />
                        <path d="M 442,132 L 488,103" strokeWidth="3" />
                        {/* Bare foot blade anatomy contour */}
                        <path d="M 486,101 C 493,98 497,94 502,94 C 504,96 501,101 498,103 C 495,105 491,107 488,103" strokeWidth="2.8" fill="#1c1917" />

                        {/* Torso & dobok uniform folds */}
                        <path d="M 326,145 C 308,148 312,165 318,178 C 325,185 336,190 352,172" strokeWidth="3" />
                        {/* Collar cross line - Masterly drawn black collar representing black belt level */}
                        <path d="M 326,145 C 334,147 344,153 350,165" strokeWidth="3.5" />
                        <path d="M 334,148 C 338,152 342,158 344,168" strokeWidth="2.5" />
                        <path d="M 326,145 C 332,152 334,162 336,172" strokeWidth="2" />

                        {/* Left bent arm & clenched fist at chest (balance guard) */}
                        <path d="M 318,155 C 310,158 302,168 305,176" strokeWidth="2.5" />
                        <circle cx="304" cy="176" r="3.5" fill="#1c1917" stroke="none" />
                        {/* Right extended balancing hand */}
                        <path d="M 352,163 C 362,165 372,162 384,156" strokeWidth="2.2" />
                        <circle cx="386" cy="155" r="3" fill="#1c1917" stroke="none" />

                        {/* Black Belt knotted firmly around the waist with floating tips */}
                        <path d="M 344,171 C 340,172 332,174 328,174" strokeWidth="4.5" />
                        {/* Knot */}
                        <path d="M 345,171 C 347,173 349,178 346,183" strokeWidth="5" />
                        {/* Floating tip 1 */}
                        <path d="M 346,183 C 344,196 338,206 322,208" strokeWidth="3.2" />
                        <path d="M 345,184 C 343,197 337,207 321,209" strokeWidth="1.2" stroke="#ffffff" />
                        {/* Floating tip 2 */}
                        <path d="M 347,181 C 354,194 352,210 345,222" strokeWidth="2.8" />
                        <path d="M 346,182 C 353,195 351,211 344,223" strokeWidth="1" stroke="#ffffff" />

                        {/* Traditional sketched Head & Hair */}
                        {/* Hair silhouette is stylized ink sweeps pointing to the left (wind balance effect) */}
                        <path d="M 328,118 C 324,122 322,128 325,134 C 328,140 334,142 342,141 C 346,138 348,132 346,126 C 344,120 336,116 328,118 Z" fill="#1c1917" />
                        <path d="M 324,120 C 318,124 316,132 320,136" strokeWidth="1.5" />
                        <path d="M 328,116 C 328,110 334,108 340,110" strokeWidth="1.2" />
                        <path d="M 344,120 C 348,124 350,130 346,136" strokeWidth="1" />
                        {/* Face jawline outline */}
                        <path d="M 342,140 C 344,141 346,139 347,137" strokeWidth="2" />
                      </g>
                    </g>
                  </svg>

                  {/* 
                    "TAEKWONDO PARA TODOS" Slogan Layout overlaid perfectly inside 
                    the center of the belt matching the image geometry 
                  */}
                  <div className="absolute top-[48%] left-[58%] -translate-y-1/2 text-left z-10 w-[50%] max-w-[380px]">
                    <h2 className="text-black font-brush select-none leading-[0.9] text-left">
                      <span className="block text-3xl sm:text-4.5xl md:text-5.5xl tracking-tight uppercase">
                        TAEKWONDO
                      </span>
                      <span className="block text-2.5xl sm:text-3.5xl md:text-4.5xl tracking-normal uppercase mt-1 text-neutral-900">
                        PARA TODOS
                      </span>
                    </h2>
                  </div>

                </div>

                {/* 
                  ====================================================
                  TEXTUAL HERO BOARD (Exactly from image copy)
                  ====================================================
                */}
                <div className="text-center mt-6 max-w-2xl px-4 flex flex-col items-center">
                  <h1 className="text-xl sm:text-2xl md:text-3.5xl font-extrabold tracking-tight text-black uppercase leading-tight mb-4">
                    APRENDA TAEKWONDO DE GRAÇA.<br />DO ZERO AO AVANÇADO.
                  </h1>
                  
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-8 max-w-[620px]">
                    Encontre tutoriais de movimentos, formas (Poomsae), vocabulário em coreano e seu progresso pessoal de graduação em um só lugar. Totalmente gratuito.
                  </p>

                  {/* Dynamic interactive call to action button with rough borders */}
                  <button
                    onClick={() => setActiveTab('movimentos')}
                    id="btn-hero-cta"
                    className="group bg-black text-white hover:bg-neutral-800 transition-colors py-3 px-8 text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer relative"
                    style={{
                      border: '3px double #ffffff',
                      outline: '2.5px solid #000000'
                    }}
                  >
                    <span>COMEÇAR AGORA</span>
                    <span className="transition-transform group-hover:translate-x-1 duration-150">→</span>
                  </button>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === 'movimentos' && (
            <motion.div
              key="movimentos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 py-8"
            >
              {/* ========================================================
                  HEADER SCHEMA SECTION (Double outlined, technical feel)
                  ======================================================== */}
              <header className="mb-8 border-2 border-black bg-white p-6 relative overflow-hidden card-border-double">
                <div className="absolute top-0 right-0 hatch-pattern h-8 w-16 opacity-30 border-b border-l border-black" />
                <div className="absolute bottom-0 left-0 hatch-pattern h-6 w-12 opacity-20 border-t border-r border-black" />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-black pb-4">
                  <div>
                    <h1 className="text-3xl font-black tracking-tight uppercase leading-none mt-1">
                      CRONOGRAMA DE GUP
                    </h1>
                    <p className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-tight mt-0.5">
                      Roteiro Prático de Treinamento e Checklist de Graduação Gup
                    </p>
                  </div>

                  {/* General progress mini widget */}
                  <div className="mt-4 md:mt-0 bg-neutral-100 border border-black p-2 mb-1 text-right font-mono flex items-center gap-3">
                    <div className="text-left">
                      <div className="text-[8px] text-neutral-400 font-bold block uppercase leading-none">Status Geral</div>
                      <div className="text-xs font-black">{totalCompleted} / {TECHNIQUES.length} Concluídos</div>
                    </div>
                    <div className="text-3xl font-black border-l border-neutral-300 pl-3">
                      {totalPercent}%
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs leading-relaxed text-neutral-700 max-w-2xl">
                  Este é um cronograma técnico de Taekwondo (Estilo WT / Olímpico). 
                  Focado no treino residencial e de tatame. Monitore seu progresso marcando os movimentos dominados e use o simulador interativo baseado em linhas para estudar a biomecânica cinemática de cada golpe.
                </div>

                {/* Master Progress Bars Schematic */}
                <div className="mt-6 pt-4 border-t border-dashed border-neutral-300 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-[10px]">
                  {/* White belt meter */}
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>10º GUP - BRANCA</span>
                      <span>{whiteCompleted}/{whiteBeltTechs.length} ({whitePercent}%)</span>
                    </div>
                    <div className="w-full bg-neutral-100 border border-black h-3.5 relative overflow-hidden">
                      <div className="h-full bg-black transition-all duration-300" style={{ width: `${whitePercent}%` }} />
                      <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black mix-blend-difference text-white">
                        {whitePercent >= 100 ? 'CONCLUÍDO' : 'EM CURSO'}
                      </span>
                    </div>
                  </div>

                  {/* Yellow belt meter */}
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>9º E 8º GUP - AMARELA</span>
                      <span>{yellowCompleted}/{yellowBeltTechs.length} ({yellowPercent}%)</span>
                    </div>
                    <div className="w-full bg-neutral-100 border border-black h-3.5 relative overflow-hidden">
                      <div className="h-full bg-black transition-all duration-300" style={{ width: `${yellowPercent}%` }} />
                      <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black mix-blend-difference text-white">
                        {yellowPercent >= 100 ? 'CONCLUÍDO' : 'EM CURSO'}
                      </span>
                    </div>
                  </div>

                  {/* Green belt meter */}
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>7º E 6º GUP - VERDE</span>
                      <span>{greenCompleted}/{greenBeltTechs.length} ({greenPercent}%)</span>
                    </div>
                    <div className="w-full bg-neutral-100 border border-black h-3.5 relative overflow-hidden">
                      <div className="h-full bg-black transition-all duration-300" style={{ width: `${greenPercent}%` }} />
                      <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black mix-blend-difference text-white">
                        {greenPercent >= 100 ? 'CONCLUÍDO' : 'EM CURSO'}
                      </span>
                    </div>
                  </div>
                </div>
              </header>

              {/* ========================================================
                  GRADUATION CERTIFICATE DECK (Dynamic simulator reward)
                  ======================================================== */}
              {(whitePercent === 100 || yellowPercent === 100 || greenPercent === 100) && (
                <div className="mb-8 border-4 border-black border-double bg-white p-6 font-mono text-black relative">
                  <div className="absolute right-6 top-6 border-2 border-black py-1 px-3 rotate-12 font-black text-xs tracking-widest bg-white hatch-pattern-light filter drop-shadow-sm">
                    OUTORGA DIGITAL
                  </div>
                  
                  <h3 className="font-extrabold text-sm uppercase flex items-center gap-2 border-b border-black pb-2 mb-3">
                    <Award size={18} className="text-black" />
                    <span>PAINEL DE CERTIFICAÇÃO TÉCNICA (GUP-APTITUDE)</span>
                  </h3>

                  <div className="space-y-4 text-xs">
                    {whitePercent === 100 && (
                      <div className="border border-black p-3 bg-neutral-50 relative">
                        <div className="font-bold text-neutral-800 uppercase flex items-center gap-1">
                          <Check size={14} className="text-black stroke-[3]" />
                          <span>NIVELAMENTO BRANCA CONCLUÍDO (10º GUP)</span>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                          Parabéns! Você dominou todos os movimentos obrigatórios da Faixa Branca, incluindo a base <span className="font-semibold text-black">Ap Kubi</span>, o soco <span className="font-semibold text-black">Momtong Jireugi</span> e o poomsae inicial <span className="font-semibold text-black">Taegeuk Il Jang (Ceu)</span>. Seu corpo está preparado para suportar a exaustão da Faixa Amarela.
                        </p>
                        <div className="mt-3 pt-2.5 border-t border-dashed border-neutral-300 flex justify-between text-[9px] text-neutral-400">
                          <span>AUTENTICAÇÃO: WT-BR-10G-{String(whiteCompleted).padStart(2, '0')}</span>
                          <span className="uppercase text-black font-semibold">APTO PARA EXAME DE 9º GUP</span>
                        </div>
                      </div>
                    )}

                    {yellowPercent === 100 && (
                      <div className="border border-black p-3 bg-neutral-50 relative">
                        <div className="font-bold text-neutral-800 uppercase flex items-center gap-1">
                          <Check size={14} className="text-black stroke-[3]" />
                          <span>NIVELAMENTO AMARELA CONCLUÍDO (9º E 8º GUP)</span>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                          Excelente desempenho! Você desenvolveu elasticidade e coordenação cruzada avançada para aplicar o chute semicircular <span className="font-semibold text-black">Dollyo Chagi</span> e o poderoso <span className="font-semibold text-black">Jebi-poom Mok-chigi</span>. Desbloqueou o Taegeuk Ee Jang e Sam Jang.
                        </p>
                        <div className="mt-3 pt-2.5 border-t border-dashed border-neutral-300 flex justify-between text-[9px] text-neutral-400">
                          <span>AUTENTICAÇÃO: WT-AM-8G-{String(yellowCompleted).padStart(2, '0')}</span>
                          <span className="uppercase text-black font-semibold">APTO PARA EXAME DE 7º GUP</span>
                        </div>
                      </div>
                    )}

                    {greenPercent === 100 && (
                      <div className="border border-black p-3 bg-neutral-50 relative">
                        <div className="font-bold text-neutral-800 uppercase flex items-center gap-1">
                          <Check size={14} className="text-black stroke-[3]" />
                          <span>NIVELAMENTO VERDE CONCLUÍDO (7º E 6º GUP)</span>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                          Soberbo! O domínio do <span className="font-semibold text-black">Yop Chagi (Chute Lateral)</span> e <span className="font-semibold text-black">Naeryo Chagi (Chute Descendente)</span> provam solidez pélvica e velocidade impressionante. Os poomsaes da natureza (Trovão e Vento) estão assimilados.
                        </p>
                        <div className="mt-3 pt-2.5 border-t border-dashed border-neutral-300 flex justify-between text-[9px] text-neutral-400">
                          <span>AUTENTICAÇÃO: WT-VD-6G-{String(greenCompleted).padStart(2, '0')}</span>
                          <span className="uppercase text-black font-semibold">APTO PARA EXAME DE FAIXA AZUL</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ========================================================
                  NAVIGATION CONTROL & FILTERING BOARD
                  ======================================================== */}
              <section className="mb-6 border-2 border-black bg-white p-4 font-mono text-xs text-black">
                <div className="flex items-center gap-2 pb-3 mb-4 border-b border-black">
                  <SlidersHorizontal size={14} />
                  <span className="font-bold tracking-wider uppercase">Painel de Filtros e Busca Rápida</span>
                </div>

                <div className="space-y-4">
                  {/* Search Engine */}
                  <div className="flex rounded-none border border-black overflow-hidden bg-neutral-50">
                    <span className="p-2.5 bg-white border-r border-black flex items-center">
                      <Search size={15} />
                    </span>
                    <input
                      type="text"
                      placeholder="Pesquisar por nome coreano, tradução, gup ou movimento técnica (ex: 'Chagi', 'Ap Kubi')..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      id="search-techniques-input"
                      className="w-full p-2.5 px-3 bg-transparent border-none text-xs focus:outline-none focus:ring-0 placeholder-neutral-400 font-mono text-black"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        id="btn-clear-search"
                        className="px-3 text-neutral-400 font-bold hover:text-black border-l border-black bg-white text-[10px] uppercase"
                      >
                        Limpar
                      </button>
                    )}
                  </div>

                  {/* Belts Selector row */}
                  <div>
                    <span className="block text-[10px] font-bold text-neutral-400 uppercase mb-1.5 tracking-wider">
                      Filtrar por Faixa Técnica / Graduação:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        onClick={() => setSelectedBelt('all')}
                        id="btn-filter-belt-all"
                        className={`py-2 px-3 border font-bold text-center tracking-tight transition-all duration-100 ${
                          selectedBelt === 'all'
                            ? 'bg-black text-white border-black font-bold'
                            : 'bg-white text-black border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        VER TODAS ({TECHNIQUES.length})
                      </button>
                      <button
                        onClick={() => setSelectedBelt('white')}
                        id="btn-filter-belt-white"
                        className={`py-2 px-3 border font-bold text-center tracking-tight transition-all duration-100 flex items-center justify-center gap-2 ${
                          selectedBelt === 'white'
                            ? 'bg-black text-white border-black font-bold'
                            : 'bg-white text-black border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        <span className="w-3.5 h-2 bg-white border border-neutral-300 inline-block" />
                        <span>BRANCA ({whiteBeltTechs.length})</span>
                      </button>
                      <button
                        onClick={() => setSelectedBelt('yellow')}
                        id="btn-filter-belt-yellow"
                        className={`py-2 px-3 border font-bold text-center tracking-tight transition-all duration-100 flex items-center justify-center gap-2 ${
                          selectedBelt === 'yellow'
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        <span className="w-3.5 h-2 bg-neutral-100 border border-neutral-400 inline-block hatch-pattern-light" />
                        <span>AMARELA ({yellowBeltTechs.length})</span>
                      </button>
                      <button
                        onClick={() => setSelectedBelt('green')}
                        id="btn-filter-belt-green"
                        className={`py-2 px-3 border font-bold text-center tracking-tight transition-all duration-100 flex items-center justify-center gap-2 ${
                          selectedBelt === 'green'
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        <span className="w-3.5 h-2 bg-neutral-200 border border-neutral-600 inline-block hatch-pattern" />
                        <span>VERDE ({greenBeltTechs.length})</span>
                      </button>
                    </div>
                  </div>

                  {/* Category select row */}
                  <div>
                    <span className="block text-[10px] font-bold text-neutral-400 uppercase mb-1.5 tracking-wider">
                      Foco de Categoria de Movimento:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setSelectedCategory('all')}
                        id="btn-filter-cat-all"
                        className={`py-1.5 px-2.5 border text-[10px] font-bold uppercase transition-all duration-100 ${
                          selectedCategory === 'all'
                            ? 'bg-black text-white border-black'
                            : 'bg-neutral-100 text-neutral-700 border-neutral-300 hover:bg-neutral-200'
                        }`}
                      >
                        TODAS CATEGORIAS
                      </button>
                      {(['stance', 'defense', 'attack', 'kick', 'poomsae'] as TechniqueCategory[]).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          id={`btn-filter-cat-${cat}`}
                          className={`py-1.5 px-2.5 border text-[10px] font-bold uppercase transition-all duration-100 ${
                            selectedCategory === cat
                              ? 'bg-black text-white border-black'
                              : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100'
                          }`}
                        >
                          {categoryLabels[cat]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Reset progress triggers */}
              {totalCompleted > 0 && (
                <div className="flex justify-end mb-4 font-mono">
                  <button
                    onClick={resetAllProgress}
                    id="btn-reset-all-progress"
                    className="px-3 py-1.5 bg-neutral-100 text-neutral-600 hover:bg-black hover:text-white transition-colors duration-150 border border-neutral-300 hover:border-black text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Trash2 size={12} />
                    <span>Zerar Progresso ({totalCompleted})</span>
                  </button>
                </div>
              )}

              {/* Techniques mapping card grid */}
              <section className="space-y-8">
                {filteredTechniques.length === 0 ? (
                  <div className="border bg-white text-center p-12 text-xs font-mono text-neutral-500 border-neutral-300">
                    <Info className="mx-auto mb-2 text-neutral-400" size={20} />
                    <div className="font-bold uppercase text-neutral-400">Nenhuma técnica encontrada para os filtros</div>
                    <p className="mt-1">Tente pesquisar por outros termos ou alterar as seleções de faixas e categorias acima.</p>
                    <button
                      onClick={() => {
                        setSelectedBelt('all');
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                      className="mt-4 px-3 py-1 bg-black text-white font-bold uppercase text-[10px] tracking-wide cursor-pointer"
                    >
                      Limpar Todos os Filtros
                    </button>
                  </div>
                ) : (
                  filteredTechniques.map((tech) => {
                    const isCompleted = !!completedList[tech.id];
                    const bMap = beltMap[tech.belt];
                    
                    return (
                      <article
                        key={tech.id}
                        id={`tech-card-${tech.id}`}
                        className={`border-2 border-black bg-white transition-all duration-200 shadow-sm relative overflow-hidden ${
                          isCompleted ? 'bg-neutral-50/70 border-dashed opacity-90' : ''
                        }`}
                      >
                        {/* Completed Watermark Cover */}
                        {isCompleted && (
                          <div className="absolute top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none rotate-[15deg]">
                            <div className="border-4 border-dashed border-neutral-400 text-neutral-400 py-3.5 px-8 font-mono text-3xl font-black tracking-widest uppercase opacity-45 select-none text-center bg-white">
                              / DOMINADO /
                            </div>
                          </div>
                        )}

                        {/* Card metadata Header bar */}
                        <div className="border-b border-black p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-white relative">
                          <div className="flex items-center gap-2 font-mono text-[9px] uppercase font-bold text-neutral-500">
                            <span className={`px-2 py-0.5 border border-black font-black bg-neutral-100 ${
                              tech.belt === 'yellow' ? 'hatch-pattern-light bg-neutral-100 text-black' : tech.belt === 'green' ? 'hatch-pattern text-black bg-neutral-200' : 'bg-white'
                            }`}>
                              {bMap.label}
                            </span>
                            <span className="px-1.5 py-0.5 border border-neutral-300">
                              {tech.gup}
                            </span>
                            <span className="px-1.5 py-0.5 border border-neutral-300 font-semibold">
                              {categoryLabels[tech.category]}
                            </span>
                          </div>

                          {/* Dynamic Completion Checkbox button */}
                          <button
                            onClick={() => toggleCompleted(tech.id)}
                            id={`tech-checkbox-${tech.id}`}
                            className="group flex items-center gap-2 font-mono text-[11px] font-bold text-black border border-black bg-neutral-50 hover:bg-neutral-100 py-1.5 px-3 rounded-none transition-colors duration-100 w-full sm:w-auto justify-center cursor-pointer"
                          >
                            {isCompleted ? (
                              <>
                                <CheckSquare size={15} className="text-black fill-white" />
                                <span className="line-through text-neutral-500">DOMINADO! MARCAÇÃO CONCLUÍDA</span>
                              </>
                            ) : (
                              <>
                                <Square size={15} className="text-neutral-400 group-hover:text-black" />
                                <span>MARCAR COMO DOMINADO</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Technical Name titles */}
                        <div className="p-4 bg-white border-b border-dashed border-neutral-200">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <h2 className={`text-xl font-extrabold tracking-tight uppercase ${isCompleted ? 'line-through text-neutral-400' : 'text-black'}`}>
                              {tech.nameKr}
                            </h2>
                            <span className="font-mono text-xs text-neutral-400 font-semibold tracking-wider">
                              ({tech.nameHangul})
                            </span>
                            <span className="text-xs text-neutral-400">|</span>
                            <span className="text-xs text-neutral-500 font-medium">
                              {tech.namePt}
                            </span>
                          </div>
                          
                          <p className="text-xs text-neutral-600 leading-relaxed mt-2.5 max-w-2xl">
                            {tech.intro}
                          </p>
                        </div>

                        {/* Stick figure schematic layout simulator */}
                        <div className="p-4 bg-neutral-50 border-b border-neutral-200">
                          <div className="text-[9px] font-mono font-bold text-neutral-400 tracking-wider mb-2 uppercase flex items-center gap-1.5">
                            <FileText size={10} className="text-black" />
                            <span>Simulador Bio-Cinemático Interativo</span>
                          </div>
                          <SchematicVisualizer technique={tech} />
                        </div>

                        {/* Footer / Expandable Advice tips */}
                        <div className="p-4 bg-white">
                          <button
                            onClick={() => toggleMasterTipExpanded(tech.id)}
                            id={`btn-tip-expand-${tech.id}`}
                            className="w-full flex items-center justify-between text-left font-mono text-[11px] font-extrabold hover:text-black hover:underline transition-colors py-1.5 border-b border-neutral-100 cursor-pointer"
                          >
                            <span className="flex items-center gap-1.5 uppercase tracking-wide">
                              <Info size={13} className="text-neutral-500 font-bold" />
                              <span>Instrução de Aperfeiçoamento do Sabon-nim</span>
                            </span>
                            {expandedMasterTip[tech.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                          
                          {expandedMasterTip[tech.id] && tech.tip && (
                            <div className="mt-3 p-3 bg-neutral-50 border border-neutral-200 font-mono text-xs text-neutral-800 leading-relaxed max-w-2xl">
                              <div className="font-bold text-black uppercase text-[10px] mb-1">CONSELHO SÊNIOR:</div>
                              {tech.tip}
                            </div>
                          )}

                          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-mono text-neutral-400">
                            <span>MÉTODO: {tech.executionSteps.length} Passos definidos</span>
                            <span>•</span>
                            <span>PADRÃO: REGULAMENTO OFICIAL WT</span>
                          </div>
                        </div>
                      </article>
                    );
                  })
                )}
              </section>

              {/* Training Assistant (Metronome) */}
              <section className="mt-12">
                <TrainingTimer />
              </section>
            </motion.div>
          )}

          {activeTab === 'poomsae' && (
            <motion.div
              key="poomsae"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 py-8"
            >
              {/* Specialized Poomsae section banner header */}
              <header className="mb-8 border-2 border-black bg-white p-6 relative overflow-hidden card-border-double">
                <div className="absolute top-0 right-0 hatch-pattern h-8 w-16 opacity-30 border-b border-l border-black" />
                <h1 className="text-3xl font-black tracking-tight uppercase leading-none">
                  POOMSAE (FORMAS)
                </h1>
                <p className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-tight mt-1">
                  Estudo Coreográfico e Combate Imaginário Contra Múltiplos Adversários
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed max-w-2xl mt-3">
                  Poomsae é a essência artística do Taekwondo WT. Trata-se de uma matriz de movimentos ordenados que expressam conceitos da filosofia clássica oriental. Cada faixa exige a maestria absoluta do seu respectivo Poomsae para outorga de exame técnico.
                </p>
              </header>

              {/* Poomsae filtering mapping listing */}
              <section className="space-y-8">
                {TECHNIQUES.filter(t => t.category === 'poomsae').map((tech) => {
                  const isCompleted = !!completedList[tech.id];
                  const bMap = beltMap[tech.belt];
                  
                  return (
                    <article
                      key={tech.id}
                      id={`poomsae-card-${tech.id}`}
                      className="border-2 border-black bg-white shadow-sm relative overflow-hidden"
                    >
                      <div className="border-b border-black p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-neutral-50">
                        <div className="flex items-center gap-2 font-mono text-[9px] uppercase font-bold text-neutral-500">
                          <span className={`px-2 py-0.5 border border-black font-black bg-white ${
                            tech.belt === 'yellow' ? 'hatch-pattern-light text-black' : tech.belt === 'green' ? 'hatch-pattern text-black bg-neutral-200' : ''
                          }`}>
                            {bMap.label}
                          </span>
                          <span className="px-1.5 py-0.5 border border-neutral-300">
                            {tech.gup}
                          </span>
                        </div>

                        <button
                          onClick={() => toggleCompleted(tech.id)}
                          className="group flex items-center gap-2 font-mono text-[11px] font-bold text-black border border-black bg-white hover:bg-neutral-100 py-1 px-2.5 rounded-none cursor-pointer"
                        >
                          {isCompleted ? (
                            <>
                              <CheckSquare size={13} className="text-black fill-white" />
                              <span className="line-through text-neutral-500">POOMSAE CONCLUÍDO</span>
                            </>
                          ) : (
                            <>
                              <Square size={13} className="text-neutral-400 group-hover:text-black" />
                              <span>MARCAR COMO DOMINADO</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="p-4 bg-white border-b border-neutral-100">
                        <h2 className="text-xl font-extrabold tracking-tight uppercase">
                          {tech.nameKr} <span className="font-mono text-xs text-neutral-400">({tech.nameHangul})</span>
                        </h2>
                        <div className="text-xs text-neutral-500 font-bold uppercase tracking-tight mt-0.5">
                          Tradução Conceitual: {tech.namePt}
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed mt-2">
                          {tech.intro}
                        </p>
                      </div>

                      <div className="p-4 bg-neutral-50 border-b border-neutral-100">
                        <div className="text-[9px] font-mono font-bold text-neutral-400 tracking-wider mb-2 uppercase">
                          Estudo Sequencial das Transições das Ações
                        </div>
                        <SchematicVisualizer technique={tech} />
                      </div>

                      <div className="p-4 bg-white font-mono text-xs space-y-2">
                        <div className="font-bold uppercase text-[10px] text-neutral-400 tracking-wider">
                          Dicas Estratégicas para o Tatame:
                        </div>
                        <p className="text-neutral-700 leading-relaxed text-[11px]">
                          {tech.tip}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </section>
            </motion.div>
          )}

          {activeTab === 'glossario' && (
            <motion.div
              key="glossario"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 py-8"
            >
              {/* Headline glossary header banner */}
              <header className="mb-8 border-2 border-black bg-white p-6 relative overflow-hidden card-border-double">
                <div className="absolute top-0 right-0 hatch-pattern h-8 w-16 opacity-30 border-b border-l border-black" />
                <h1 className="text-3xl font-black tracking-tight uppercase leading-none">
                  GLOSSÁRIO TÉCNICO WT
                </h1>
                <p className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-tight mt-1">
                  Comandos de Voz e Vocabulário de Dojang Tradicional Coreano
                </p>
              </header>

              {/* Glossary core search engine and grid mapping */}
              <section className="bg-white border-2 border-black p-5 font-mono text-black">
                <div className="text-xs text-neutral-500 mb-4 leading-relaxed">
                  Estude as terminologias oficiais exigidas pelas bancas avaliadoras de graduação durante exames de Gup orais.
                </div>

                <div className="flex border border-black overflow-hidden max-w-md bg-neutral-50 mb-6">
                  <span className="p-2.5 border-r border-black flex items-center justify-center bg-white text-neutral-500">
                    <Search size={14} />
                  </span>
                  <input
                    type="text"
                    placeholder="Pesquisar comando (ex: 'Junbi', 'Kihap')..."
                    value={searchTermGlossary}
                    onChange={(e) => setSearchTermGlossary(e.target.value)}
                    id="search-glossary-input"
                    className="w-full px-3 py-1.5 bg-transparent text-xs focus:outline-none focus:ring-0 placeholder-neutral-400 font-mono text-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredGlossary.length === 0 ? (
                    <div className="col-span-full text-center py-8 text-neutral-400 text-xs">
                      Nenhum termo do glossário correspondente encontrado.
                    </div>
                  ) : (
                    filteredGlossary.map((item, idx) => (
                      <div key={idx} className="border border-black p-3.5 hover:bg-neutral-50 transition-colors duration-75 flex flex-col justify-between">
                        <span className="font-extrabold text-black text-xs block border-b border-neutral-100 pb-1.5">
                          {item.term}
                        </span>
                        <span className="text-neutral-600 text-[10px] leading-relaxed mt-2 block">
                          {item.meaning}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'sobre' && (
            <motion.div
              key="sobre"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 py-8"
            >
              {/* About banner info */}
              <header className="mb-8 border-2 border-black bg-white p-6 relative overflow-hidden card-border-double">
                <div className="absolute top-0 right-0 hatch-pattern h-8 w-16 opacity-30 border-b border-l border-black" />
                <h1 className="text-3xl font-black tracking-tight uppercase leading-none">
                  SOBRE A METODOLOGIA
                </h1>
                <p className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-tight mt-1">
                  Guia Prático, Filosofia Marcial e Regras Filosóficas de Dojang
                </p>
              </header>

              {/* Principles content */}
              <article className="border-2 border-black bg-white p-6 font-mono text-xs space-y-6 text-black">
                <div>
                  <h3 className="font-black text-sm uppercase tracking-tight border-b border-black pb-2 mb-3">
                    OS 5 PRINCÍPIOS ESSENCIAIS DO TAEKWONDO
                  </h3>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    O caminho ("Do") do Taekwondo envolve o aperfeiçoamento da força muscular aliado de forma sagrada à ética social cotidiana. Antes de desferir chutes, domine sua moralidade.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-neutral-300 p-3 bg-neutral-50">
                      <span className="font-extrabold text-black block mb-0.5">1. Cortesia (Ye Ui) // 예의</span>
                      <p className="text-[10px] text-neutral-500 leading-relaxed">Respeitar instrutores técnicos sêniores, auxiliar colegas iniciantes de menor graduação e rejeitar a arrogância corporal.</p>
                    </div>
                    <div className="border border-neutral-300 p-3 bg-neutral-50">
                      <span className="font-extrabold text-black block mb-0.5">2. Integridade (Yom Chi) // 염치</span>
                      <p className="text-[10px] text-neutral-500 leading-relaxed">Saber julgar suas próprias atitudes e ser honesto consigo mesmo. Jamais fingir domínios marciais inexistentes.</p>
                    </div>
                    <div className="border border-neutral-300 p-3 bg-neutral-50">
                      <span className="font-extrabold text-black block mb-0.5">3. Perseverança (In Nae) // 인내</span>
                      <p className="text-[10px] text-neutral-500 leading-relaxed">Persistir contra toda dor pélvica e muscular. A exaustão técnica do tatame precede o surgimento da maestria.</p>
                    </div>
                    <div className="border border-neutral-300 p-3 bg-neutral-50">
                      <span className="font-extrabold text-black block mb-0.5">4. Autocontrole (Guk Gi) // 극기</span>
                      <p className="text-[10px] text-neutral-500 leading-relaxed">Conter as reações físicas bruscas e dominar a exaltação esportiva durante seções de combate livre de Kyorugui.</p>
                    </div>
                  </div>

                  <div className="border border-black p-4 bg-neutral-50 text-center font-bold text-xs mt-4">
                    5. Espírito Indomável (Baekjul Boolgool) // 백절불굴
                    <p className="text-[10px] text-neutral-400 font-normal mt-1 uppercase leading-relaxed max-w-xl mx-auto">
                      A coragem incorruptível de se postar ao lado da justiça contra opressores, independente do tamanho do perigo ou do número de adversários.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-dashed border-neutral-300">
                  <h3 className="font-black text-sm uppercase tracking-tight border-b border-black pb-2 mb-3">
                    NÍVEIS DE GRADUAÇÃO DE EXAME TÉCNICO (GUP)
                  </h3>
                  <div className="space-y-3 font-mono text-[11px] leading-relaxed">
                    <p>
                      <strong className="text-black">10º Gup (Faixa Branca):</strong> O início do caminho. Representa a semente oculta no solo que ainda não germinou. O foco está no aprendizado de bases largas estáveis e defesas fundamentais.
                    </p>
                    <p>
                      <strong className="text-black">9º e 8º Gup (Faixa Amarela):</strong> A semente começa a brotar e receber os primeiros feixes do sol. Introdução da pivotagem rotacional oblíqua dos pés e chutes circulares dinâmicos no tronco.
                    </p>
                    <p>
                      <strong className="text-strong text-black">7º e 6º Gup (Faixa Verde):</strong> O broto de Taekwondo cresce e as folhas ramificam. Domínio da flexão rígida de quadril para rechaço linear com chutes laterais furiosos (Yop Chagi) e poomsaes da natureza.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-dashed border-neutral-300 text-center text-[10px] text-neutral-400">
                  <div>DESENVOLVIDO EM CONFORMIDADE COM AS DIRETRIZES TÉCNICAS DA WT (WORLD TAEKWONDO)</div>
                  <div className="mt-1">© 2026 PLATAFORMA DE EXAME E SIMULADOR DIGITAL CLIENT-SIDE</div>
                </div>
              </article>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ==========================================
          GLOBAL CORE FOOTER
          ========================================== */}
      <footer className="mt-16 text-center text-xs font-mono text-neutral-400 border-t border-neutral-200 pt-6 px-4">
        <div>© 2026 TAEKWONDO</div>
        <div className="text-[10px] text-neutral-300 uppercase mt-1">
          Projeto para Ensinar passo a passo.
        </div>
      </footer>

    </div>
  );
}
