import { Technique } from './types';

export const TECHNIQUES: Technique[] = [
  // ==================== MÓDULO 1: FAIXA BRANCA (10º GUP) ====================
  {
    id: 'ap-seogi',
    nameKr: 'Ap Seogi',
    nameHangul: '앞서기',
    namePt: 'Base de Caminhada',
    belt: 'white',
    gup: '10º Gup',
    category: 'stance',
    intro: 'A base mais simples do Taekwondo, assemelhando-se a um passo curto de caminhada comum. Serve para transições rápidas e descolamentos ágeis.',
    tip: 'Mantenha os ombros relaxados e voltados para a frente. O calcanhar do pé de trás não deve sair do chão.',
    executionSteps: [
      {
        frame: 1,
        label: 'Posição Inicial',
        description: 'Fique na posição de prontidão (Chunbi-seogi), pés paralelos alinhados com a largura dos ombros.',
        svgPath: 'M 30,80 L 70,80 M 30,80 L 30,50 L 50,50 L 50,80',
        annotations: ['Pés paralelos', 'Largura dos ombros', 'Tronco reto']
      },
      {
        frame: 2,
        label: 'Avanço do Pé',
        description: 'Avance com um pé para a frente (cerca de um passo normal). Mantenha a largura de um ombro entre as pernas (lateralmente).',
        svgPath: 'M 30,80 L 30,50 M 55,80 L 55,45 M 30,50 L 55,45',
        annotations: ['Passo de caminhada normal', 'Pé da frente reto', 'Pé de trás angulado até 30°']
      },
      {
        frame: 3,
        label: 'Distribuição',
        description: 'Distribua o peso do corpo igualmente (50% na frente e 50% atrás). Mantenha o joelho da frente levemente esticado mas relaxado.',
        svgPath: 'M 30,80 L 30,50 M 55,80 L 55,48 L 42,40 L 30,50',
        annotations: ['Peso dividido 50h/50t', 'Coluna perfeitamente vertical', 'Quadris voltados para a frente']
      }
    ]
  },
  {
    id: 'ap-kubi',
    nameKr: 'Ap Kubi',
    nameHangul: '앞굽이',
    namePt: 'Base da Frente Longa',
    belt: 'white',
    gup: '10º Gup',
    category: 'stance',
    intro: 'Uma das bases primárias de ataque e estabilização de força. Oferece alta estabilidade para técnicas frontais poderosas.',
    tip: 'Se você olhar para baixo, o joelho da frente deve cobrir a visão dos dedos do pé. A perna traseira precisa estar totalmente estendida.',
    executionSteps: [
      {
        frame: 1,
        label: 'Preparação do Passo',
        description: 'Partindo de Chunbi, flua o centro de gravidade para baixo flexionando levemente os joelhos antes de projetar a força para a frente.',
        svgPath: 'M 30,80 L 30,52 M 45,80 L 45,52',
        annotations: ['Abaixe o centro de gravidade', 'Mantenha estabilidade pélvica']
      },
      {
        frame: 2,
        label: 'Passo Amplo',
        description: 'Avance o pé frontal a uma distância de aproximadamente um passo e meio a dois passos de caminhada. Mantenha a largura de um ombro.',
        svgPath: 'M 20,80 L 20,52 M 70,80 L 70,60',
        annotations: ['Passo longo (1.5x a 2x largura de ombros)', 'Pé traseiro angulado em até 30°']
      },
      {
        frame: 3,
        label: 'Fixação e Flexão',
        description: 'Flexione o joelho dianteiro de forma que fique verticalmente alinhado sobre os dedos dos pés. Estique totalmente a perna traseira.',
        svgPath: 'M 22,80 L 22,50 M 70,80 L 58,62 L 58,45 L 22,50',
        annotations: ['70% do peso na perna frontal', 'Joelho da frente flexionado a 90°', 'Perna traseira esticada']
      }
    ]
  },
  {
    id: 'are-makki',
    nameKr: 'Are Makki',
    nameHangul: '아래막기',
    namePt: 'Defesa Baixa',
    belt: 'white',
    gup: '10º Gup',
    category: 'defense',
    intro: 'Defesa fundamental para proteger o baixo ventre e as coxas contra chutes frontais ou socos baixos.',
    tip: 'O braço que defende deve parar a uma distância equivalente a dois punhos fechados acima da coxa correspondente.',
    executionSteps: [
      {
        frame: 1,
        label: 'Carregamento / Ponto Inicial',
        description: 'Cruze os braços na altura do peito: o punho defensivo vai ao ombro oposto com a palma voltada para a orelha; o outro braço estende à frente.',
        svgPath: 'M 35,45 Q 45,35 50,45 M 50,45 L 30,60',
        annotations: ['Punho defensivo no ombro oposto', 'Dorso do punho para fora', 'Braço de apoio estendido']
      },
      {
        frame: 2,
        label: 'Trajetória Descendente',
        description: 'Desça o punho defensivo em uma trajetória oblíqua rente ao corpo, enquanto puxa o braço de apoio em direção à cintura.',
        svgPath: 'M 35,45 L 40,60 M 30,60 L 45,60',
        annotations: ['Braço desliza rente ao tronco', 'Rotacionando os punhos simultaneamente']
      },
      {
        frame: 3,
        label: 'Bloqueio Final e Tração',
        description: 'Termine o movimento bloqueando acima da coxa com o cotovelo levemente flexionado. O punho de tração se encaixa perfeitamente na cintura.',
        svgPath: 'M 40,70 L 40,75 M 48,55 L 48,58',
        annotations: ['Distância de 2 punhos da coxa', 'Punho oposto na cintura (Jang-seol)', 'Expiração e contração abdominal']
      }
    ]
  },
  {
    id: 'momtong-an-makki',
    nameKr: 'Momtong An Makki',
    nameHangul: '몸통안막기',
    namePt: 'Defesa Interna do Tronco',
    belt: 'white',
    gup: '10º Gup',
    category: 'defense',
    intro: 'Uma defesa clássica de fora para dentro projetada para desviar golpes mirados na direção do peito e plexo solar.',
    tip: 'O punho defensivo não deve ultrapassar a linha média do corpo e deve terminar alinhado com a altura do ombro.',
    executionSteps: [
      {
        frame: 1,
        label: 'Engatilhamento',
        description: 'O braço de bloqueio estende-se para trás e para fora, levemente abaixo do nível do ombro. O braço oposto estende-se à frente para apontar o alvo.',
        svgPath: 'M 70,50 L 50,50 M 30,50 L 30,60',
        annotations: ['Braço ativo recuado para fora', 'Dorso do punho voltado para trás', 'Foco no oponente']
      },
      {
        frame: 2,
        label: 'Arco Defensivo',
        description: 'Rotacione o tronco enquanto traz o cotovelo e o antebraço defensivo fazendo um arco parabólico de trás para a frente.',
        svgPath: 'M 60,45 C 50,45 42,48 42,52',
        annotations: ['Corte do espaço em semicírculo', 'Uso do quadril para acelerar']
      },
      {
        frame: 3,
        label: 'Impacto Interno',
        description: 'Estabilize o braço defensivo em frente ao tronco. O punho termina à altura do esterno, inclinado para dentro. O outro punho recolhe à cintura.',
        svgPath: 'M 45,50 L 45,40 M 35,55 L 35,58',
        annotations: ['Ângulo de 90° no cotovelo ativo', 'Punho na linha do esterno', 'Punho oposto firmemente travado à cintura']
      }
    ]
  },
  {
    id: 'momtong-jireugi',
    nameKr: 'Momtong Jireugi',
    nameHangul: '몸통지르기',
    namePt: 'Soco no Tronco',
    belt: 'white',
    gup: '10º Gup',
    category: 'attack',
    intro: 'O ataque de punho inicial do Taekwondo. Utiliza a rotação do quadril e o efeito de polia ("pistão") com os braços de soco e recolhimento.',
    tip: 'O soco deve atingir exatamente a linha média do corpo (plexo solar), com os dois nós principais do punho (indicador e médio).',
    executionSteps: [
      {
        frame: 1,
        label: 'Posição Inicial / Alinhamento',
        description: 'O braço ativo fica preparado na cintura (com a palma voltada para cima) e o outro braço estendido à frente.',
        svgPath: 'M 35,55 L 35,58 M 30,50 L 50,50',
        annotations: ['Trator recolhido na cintura', 'Mira frontal estendida']
      },
      {
        frame: 2,
        label: 'Disparo de Força',
        description: 'Empurre o quadril e o punho ativo à frente em linha reta, enquanto puxa o braço estendido de volta.',
        svgPath: 'M 40,53 L 45,53 M 25,50 L 32,50',
        annotations: ['Início de rotação do punho', 'Os braços se cruzam no meio do caminho']
      },
      {
        frame: 3,
        label: 'Impacto e Rotação Final',
        description: 'O punho que soca rotaciona 180 graus completando o soco com a palma para baixo. O braço oposto trava na cintura.',
        svgPath: 'M 35,58 M 30,50 L 60,50',
        annotations: ['Soco no centro geométrico (Plexo)', 'Dorso do punho para cima no soco', 'Contração de impacto (Kihap!)']
      }
    ]
  },
  {
    id: 'apt-chagi',
    nameKr: 'Apt Chagi',
    nameHangul: '앞차기',
    namePt: 'Chute Frontal',
    belt: 'white',
    gup: '10º Gup',
    category: 'kick',
    intro: 'Chute básico e extremamente rápido, focado em percussão e velocidade. Golpeia-se usando a parte da planta do pé chamada "Apchook".',
    tip: 'Não chute empurrando a perna de trás inteira esticada. A elevação rápida do joelho engatilhado é o segredo da potência.',
    executionSteps: [
      {
        frame: 1,
        label: 'Elevação do Joelho / Câmara',
        description: 'Eleve o joelho da perna traseira de forma rápida e vertical, dobrando totalmente o calcanhar perto do quadril.',
        svgPath: 'M 30,80 L 30,50 L 45,50 L 45,65',
        annotations: ['Joelhos flexionados ao peito', 'Pé de apoio firme no chão', 'Flexão de quadril rápida']
      },
      {
        frame: 2,
        label: 'Extensão / Snap',
        description: 'Estenda a perna à frente como um chicote elástico, flexionando os dedos dos pés para trás para bater com o metatarso (Apchook).',
        svgPath: 'M 30,80 L 30,50 L 40,48 L 65,48',
        annotations: ['Chicotear do joelho', 'Dedos dos pés flexionados para cima', 'Alvo na altura do tronco ou rosto']
      },
      {
        frame: 3,
        label: 'Recolhimento e Guarda',
        description: 'Recolha o pé rapidamente à posição de câmara antes que a gravidade o puxe para baixo, restabelecendo o equilíbrio corporal.',
        svgPath: 'M 30,80 L 30,50 L 42,50 L 42,65',
        annotations: ['Retornar à câmara rapidamente', 'Retomar base em equilíbrio']
      }
    ]
  },
  {
    id: 'poomsae-1',
    nameKr: 'Taegeuk Il Jang',
    nameHangul: '태극 1장',
    namePt: 'Conceito do Céu (Keon)',
    belt: 'white',
    gup: '10º Gup',
    category: 'poomsae',
    intro: 'O primeiro poomsae. Representa o "Keon" (Céu / Princípio de tudo). Caracteriza-se por movimentos retos, claros, potentes e bases firmes focadas em comandos básicos.',
    tip: 'Pense na transição de forças. Pratique a aplicação correta de Are Makki, Momtong Jireugi e Ap Kubi conforme realiza as curvas de 90° e 180°.',
    executionSteps: [
      {
        frame: 1,
        label: 'Início: Esquerda 90°',
        description: 'Vire à esquerda 90° entrando em Ap Seogi com o braço esquerdo executando Are Makki.',
        svgPath: 'M 30,80 L 30,50 M 30,50 L 25,60',
        annotations: ['Vire para a esquerda', 'Ap Seogi curto', 'Are Makki firme']
      },
      {
        frame: 2,
        label: 'Avanço com Soco',
        description: 'Avance um passo em Ap Seogi e desfira Momtong Jireugi com o braço direito.',
        svgPath: 'M 30,80 L 45,80 M 45,50 L 55,50',
        annotations: ['Avance pé direito', 'Soco no tronco simultâneo ao passo']
      },
      {
        frame: 3,
        label: 'Giro 180° e Defesa',
        description: 'Gire 180° sobre o pé esquerdo para a direita, entrando em Ap Seogi com o braço direito executando Are Makki.',
        svgPath: 'M 45,80 L 15,80 M 15,50 L 10,60',
        annotations: ['Giro completo pelas costas', 'Ap Seogi para a direita']
      }
    ]
  },

  // ==================== MÓDULO 2: FAIXA AMARELA (9º E 8º GUP) ====================
  {
    id: 'dwit-kubi',
    nameKr: 'Dwit Kubi',
    nameHangul: '뒷굽i',
    namePt: 'Base em L / Defensiva',
    belt: 'yellow',
    gup: '8º Gup',
    category: 'stance',
    intro: 'Uma postura primariamente defensiva projetada para recuar o centro de gravidade e proteger o corpo contra investidas lineares.',
    tip: '70% do seu peso corporal deve se apoiar na perna traseira. Mantenha os calcanhares desenhando uma linha reta.',
    executionSteps: [
      {
        frame: 1,
        label: 'Posicionamento Inicial',
        description: 'Aponte o pé esquerdo 90 graus para a lateral externa, mantendo o pé direito apontado para a frente.',
        svgPath: 'M 35,80 L 45,80 M 35,80 L 35,70',
        annotations: ['Calcanhares formando ângulo reto', 'Joelhos semi-flexionados']
      },
      {
        frame: 2,
        label: 'Afastamento Lateral',
        description: 'Separe as pernas a uma distância de cerca de uma largura e meia do ombro de forma linear.',
        svgPath: 'M 25,80 L 55,80 M 25,80 L 25,70 L 55,80',
        annotations: ['Mantendo alinhamento de calcanhares', 'Foco no centro de gravidade rebaixado']
      },
      {
        frame: 3,
        label: 'Distribuição Posterior',
        description: 'Flexione agudamente o joelho de trás e incline levemente o tronco lateralmente, assentando 70% da sustentação atrás e 30% à frente.',
        svgPath: 'M 25,80 L 25,50 L 40,58 L 55,80',
        annotations: ['70% peso atrás', 'Joelho de trás flexionado para fora', 'Defensivamente estável']
      }
    ]
  },
  {
    id: 'eolgun-makki',
    nameKr: 'Eolgun Makki',
    nameHangul: '얼굴막기',
    namePt: 'Defesa Alta',
    belt: 'yellow',
    gup: '8º Gup',
    category: 'defense',
    intro: 'Defesa vigorosa desenhada para bloquear socos no rosto ou ataques circulares descendentes direcionados ao crânio.',
    tip: 'O antebraço deve terminar apontado para cima em um ângulo de 45 graus, protegendo a testa a uma distância de um punho fechado.',
    executionSteps: [
      {
        frame: 1,
        label: 'Cruzamento Inferior',
        description: 'Cruze os braços na altura do umbigo/cintura. O braço defensivo fica por dentro, com o dorso voltado para o oponente.',
        svgPath: 'M 40,65 L 45,65 M 35,50 L 35,55',
        annotations: ['Braço bloqueador engatilhado na parte de baixo', 'Quadril rotacionado levemente']
      },
      {
        frame: 2,
        label: 'Trajetória Ascendente',
        description: 'Suba o braço ativo centralmente pela linha média do seu corpo, cruzando o rosto como um escudo móvel.',
        svgPath: 'M 40,65 L 40,40 M 35,55 L 45,55',
        annotations: ['O punho sobe rente ao nariz', 'Prepara o braço oposto para puxada']
      },
      {
        frame: 3,
        label: 'Trancamento e Ângulo',
        description: 'Termine o bloqueio elevando o antebraço acima da cabeça em diagonal. O braço oposto se recolhe fortemente à cintura.',
        svgPath: 'M 40,32 L 52,32 M 35,55 L 35,58',
        annotations: ['Ângulo oblíquo de 45 graus', 'Garante escoamento de impactos', 'Distância de 1 punho da testa']
      }
    ]
  },
  {
    id: 'sonnal-momtong-makki',
    nameKr: 'Sonnal Momtong Makki',
    nameHangul: '손날몸통막기',
    namePt: 'Defesa Dupla com a Faca da Mão',
    belt: 'yellow',
    gup: '8º Gup',
    category: 'defense',
    intro: 'Defesa elegante que utiliza as duas mãos abertas (Sonnal) em uma base Dwit Kubi para aparar ataques direcionados ao estômago.',
    tip: 'As pontas dos dedos da mão ativa devem terminar na altura dos seus ombros. A mão de apoio fica na altura da boca do estômago.',
    executionSteps: [
      {
        frame: 1,
        label: 'Gatilho de Mãos Abertas',
        description: 'Abra as duas mãos. Estique o braço defensor para trás do corpo com o dorso para cima. A outra mão vai próxima ao ombro traseiro.',
        svgPath: 'M 20,45 L 20,40 M 42,40 L 42,45',
        annotations: ['Dedos esticados unificados', 'Braços abertos em oposição']
      },
      {
        frame: 2,
        label: 'Movimento Arqueado',
        description: 'Puxe ambas as mãos em sincronia. A mão ativa avança contornando o tórax; a mão secundária desce ao peito.',
        svgPath: 'M 30,45 L 35,45 M 35,50 L 40,50',
        annotations: ['Aceleração usando os quadris', 'Mantém a faca da mão em tensão']
      },
      {
        frame: 3,
        label: 'Estabilização de Postura',
        description: 'A mão principal estanca bloqueando lateralmente à frente do tronco. A mão secundária repousa na horizontal acima do plexo.',
        svgPath: 'M 45,45 M 35,52',
        annotations: ['Mão ativa em 90 graus', 'Mão de trás virada para cima sob o plexo', 'Idealmente em Dwit Kubi']
      }
    ]
  },
  {
    id: 'jebi-poom-mok-chigi',
    nameKr: 'Jebi-poom Mok-chigi',
    nameHangul: '제비품목치기',
    namePt: 'Corte Duplo / Ataque de Andorinha',
    belt: 'yellow',
    gup: '8º Gup',
    category: 'attack',
    intro: 'Técnica avançada de contravaque e coordenação motora. Efetua-se simultaneamente um bloqueio alto com a faca da mão e um ataque cortante ao pescoço do oponente.',
    tip: 'O movimento deve fluir ao mesmo tempo: um braço defende enquanto o outro golpeia, rotacionando o quadril em conjunto.',
    executionSteps: [
      {
        frame: 1,
        label: 'Engate de Faca de Mão',
        description: 'Abra as mãos e recue totalmente o braço de ataque para a lateral da cintura oposta. O braço bloqueador fica elevado acima do ombro.',
        svgPath: 'M 35,60 M 45,35',
        annotations: ['Palmas opostas em prontidão', 'Rebaixamento de posição corporal']
      },
      {
        frame: 2,
        label: 'Arremesso Cruzado',
        description: 'Acelere o braço bloqueador em direção ao teto enquanto projeta o braço de ataque lateralmente à frente.',
        svgPath: 'M 40,40 L 45,30 M 35,55 L 50,45',
        annotations: ['Deslize contínuo dos antebraços', 'Rotação explosiva do tronco']
      },
      {
        frame: 3,
        label: 'Conexão de Impacto',
        description: 'O braço esquerdo defende a testa em Sonnal Eolgun Makki e a mão direita desfere Sonnal Mok-Chigi no pescoço do alvo.',
        svgPath: 'M 48,30 M 55,45',
        annotations: ['Estanque em sincronia perfeita', 'Ataque ao pescoço com faca da mão', 'Tronco firme em Ap Kubi']
      }
    ]
  },
  {
    id: 'dollyo-chagi',
    nameKr: 'Dollyo Chagi',
    nameHangul: '돌려차기',
    namePt: 'Chute Semicircular (Circular)',
    belt: 'yellow',
    gup: '8º Gup',
    category: 'kick',
    intro: 'O chute mais famoso e amplamente pontuado do Taekwondo WT. Utiliza a rotação completa dos quadris para desferir um impacto horizontal devastador com o peito do pé.',
    tip: 'Gire o calcanhar da perna de apoio 180° graus em relação ao alvo. Se o calcanhar de apoio não rotacionar, você lesionará seu joelho e travará o quadril.',
    executionSteps: [
      {
        frame: 1,
        label: 'Pivotagem e Elevação de Joelho',
        description: 'Eleve o joelho lateralmente enquanto gira o pé de apoio em 90°-120°. O joelho ativo aponta para o alvo de forma horizontal.',
        svgPath: 'M 30,80 L 30,55 L 42,50 L 45,60',
        annotations: ['Elevação oblíqua do joelho', 'Pivotagem inicial do pé de apoio', 'Mantenha os braços colados ao tórax para guarda']
      },
      {
        frame: 2,
        label: 'Rotação Pélvica / Extensão',
        description: 'Gire totalmente o quadril de apoio (e o pé de apoio em 180°). Estenda o joelho lateralmente atingindo com o peito do pé (Baldeung).',
        svgPath: 'M 30,80 L 30,55 L 45,45 L 70,45',
        annotations: ['Impacto com Baldeung', 'Quadril e joelhos perfeitamente horizontais', 'Retenção da coluna alinhada']
      },
      {
        frame: 3,
        label: 'Recolhimento Oblíquo',
        description: 'Flexione o joelho ativamente após o acerto, mantendo o quadril virado antes de aterrisar.',
        svgPath: 'M 30,80 L 30,55 L 42,50 L 40,60',
        annotations: ['Evite deixar a perna despencar', 'Recupere o equilíbrio antes da aterrissagem']
      }
    ]
  },
  {
    id: 'poomsae-2',
    nameKr: 'Taegeuk Ee Jang',
    nameHangul: '태극 2장',
    namePt: 'Conceito da Alegria/Lago (Tae)',
    belt: 'yellow',
    gup: '9º Gup',
    category: 'poomsae',
    intro: 'O segundo poomsae. Representa o "Tae" (Alegria, Firmeza interior com suavidade externa). Introduz defesas altas e ataques lineares com chutes frontais médios.',
    tip: 'Aplique movimentos suaves mas decididos. Concentre-se nas defesas altas (Eolgun Makki) e chutes diretos.',
    executionSteps: [
      {
        frame: 1,
        label: 'Esquerda 90° e Defesa Baixa',
        description: 'Mova o pé esquerdo para a esquerda em Ap Seogi executando Are Makki com a mão esquerda.',
        svgPath: 'M 30,80 M 30,50 L 25,60',
        annotations: ['Saia em Ap Seogi curto', 'Esquerda 90 graus', 'Are Makki firme']
      },
      {
        frame: 2,
        label: 'Avanço com Soco Alto',
        description: 'Avance com pé direito em Ap Kubi desferindo Eolgun Jireugi (soco alto na altura do nariz).',
        svgPath: 'M 30,80 L 50,80 M 50,55 L 60,45',
        annotations: ['Transição para postura longa', 'Soco direcionado ao rosto']
      },
      {
        frame: 3,
        label: 'Contra-ataque Frontal',
        description: 'Chute Apt Chagi com perna esquerda, aterrisse à frente em Ap Kubi e execute soco no tronco.',
        svgPath: 'M 30,80 L 45,40 L 60,80',
        annotations: ['Snap rápido de chute', 'Aterrisse firme focando no impacto']
      }
    ]
  },
  {
    id: 'poomsae-3',
    nameKr: 'Taegeuk Sam Jang',
    nameHangul: '태극 3장',
    namePt: 'Conceito do Fogo (Ri)',
    belt: 'yellow',
    gup: '8º Gup',
    category: 'poomsae',
    intro: 'O terceiro poomsae. Indica o "Ri" (Fogo, Luz e Calor). Desenvolve velocidade de execução, ataques de faca de mão e socos duplos rápidos.',
    tip: 'Execute as defesas de faca de mão de forma seca e use a rotação síncrona dos quadris nos socos duplos.',
    executionSteps: [
      {
        frame: 1,
        label: 'Esquerda 90° e Ataque Sonnal',
        description: 'Vire à esquerda 90° em Ap Seogi realizando Sonnal Mok-Chigi (corte ao pescoço com a faca da mão aberta).',
        svgPath: 'M 30,80 M 30,50 L 22,45',
        annotations: ['Giro de quadril', 'Mão em faca horizontal', 'Precisão carotídea']
      },
      {
        frame: 2,
        label: 'Avanço e Socos Duplos',
        description: 'Avance em Ap Seogi desferindo uma sequência rápida de soco-soco do peito ao tronco.',
        svgPath: 'M 30,80 L 45,80 M 45,50 L 52,50 L 58,50',
        annotations: ['Socos alternados rápidos', 'Estabilidade de bases']
      },
      {
        frame: 3,
        label: 'Giro e Bloqueio Duplo',
        description: 'Gire 180° e execute Sonnal Momtong Makki em postura Dwit Kubi defensiva.',
        svgPath: 'M 45,80 L 15,80 M 15,50 M 22,50',
        annotations: ['Foco na transição para Dwit Kubi', 'Duas mãos abertas protegendo o tronco']
      }
    ]
  },

  // ==================== MÓDULO 3: FAIXA VERDE (7º E 6º GUP) ====================
  {
    id: 'bakat-makki',
    nameKr: 'Bakat Makki',
    nameHangul: '바깥막기',
    namePt: 'Defesa para Fora',
    belt: 'green',
    gup: '6º Gup',
    category: 'defense',
    intro: 'Técnica de bloqueio em que o antebraço ativo desvia o ataque do oponente movendo-se de dentro para fora.',
    tip: 'O cotovelo deve terminar alinhado com o peito, dobrado em cerca de 90° a 110°. Mantenha os ombros relaxados.',
    executionSteps: [
      {
        frame: 1,
        label: 'Engate Interno',
        description: 'O braço ativo cruza por baixo do braço de apoio na altura da cintura oposta, palma voltada para o tronco.',
        svgPath: 'M 35,55 L 42,55 M 30,50 L 30,55',
        annotations: ['Carregamento baixo', 'Preparação de quadril torcido']
      },
      {
        frame: 2,
        label: 'Expansão Lateral',
        description: 'Puxe o braço de bloqueio em diagonal para cima e para fora, abrindo o peito de forma explosiva.',
        svgPath: 'M 35,55 L 48,45 M 30,55 L 35,58',
        annotations: ['Abra o peito', 'Use o antebraço como alavanca']
      },
      {
        frame: 3,
        label: 'Ancoragem Externa',
        description: 'Estabilize o braço defensivo na lateral externa do tronco, e o braço oposto recolhido na cintura.',
        svgPath: 'M 48,45 L 48,32 M 35,58',
        annotations: ['Dorso do punho para fora', 'Punho na altura do ombro', 'Estabilidade em Ap Seogi ou Dwit Kubi']
      }
    ]
  },
  {
    id: 'deung-jumeok-chigi',
    nameKr: 'Deung-jumeok Chigi',
    nameHangul: '등주먹치기',
    namePt: 'Ataque com as Costas do Punho',
    belt: 'green',
    gup: '6º Gup',
    category: 'attack',
    intro: 'Ataque em chicote de curta e média distância direcionado ao rosto do oponente, usando o dorso do punho.',
    tip: 'A força vem do movimento elástico de chicotear o cotovelo, complementado com uma rápida rotação do quadril.',
    executionSteps: [
      {
        frame: 1,
        label: 'Câmara sob a Axila',
        description: 'Cruze o punho ativo sob a axila ou ombro do braço oposto, com a palma voltada para baixo.',
        svgPath: 'M 35,48 M 45,45',
        annotations: ['Recuo sob axila', 'Preparação oblíqua do alvo']
      },
      {
        frame: 2,
        label: 'Chicotear Frontal',
        description: 'Dispare o punho frontalmente movendo o cotovelo de forma circular acelerada.',
        svgPath: 'M 35,48 L 45,40 L 55,40',
        annotations: ['Aceleração elástica do antebraço', 'Olhar fixo no alvo']
      },
      {
        frame: 3,
        label: 'Retorno Instantâneo',
        description: 'Atinja o alvo e recue milimetricamente o punho em um movimento de rechaço rápido. Dorso do punho voltado para cima.',
        svgPath: 'M 35,58 M 52,40 L 52,38',
        annotations: ['Alvo: nariz ou têmpora', 'Dorso do punho para frente', 'Puxada brusca pós-impacto']
      }
    ]
  },
  {
    id: 'yop-chagi',
    nameKr: 'Yop Chagi',
    nameHangul: '옆차기',
    namePt: 'Chute Lateral com o Calcanhar',
    belt: 'green',
    gup: '6º Gup',
    category: 'kick',
    intro: 'Chute de altíssimo impacto linear. Utiliza a força pura de pistão e o estiramento completo do quadril para golpear com o calcanhar e faca externa do pé.',
    tip: 'Ao disparar a perna, o pé de apoio deve girar 180° e o calcanhar ativo deve ser projetado liderando o movimento para criar máxima penetração.',
    executionSteps: [
      {
        frame: 1,
        label: 'Dobrar e Encolher (Câmara Lateral)',
        description: 'Eleve o joelho curvando-o fortemente no peito com a perna de lado. Pé ativo flexionado.',
        svgPath: 'M 30,80 L 30,55 L 20,50 L 22,62',
        annotations: ['Joelho colado ao peito lateralmente', 'Pé flexionado em faca', 'Giro inicial do pé de apoio']
      },
      {
        frame: 2,
        label: 'Impulsão Linear (Pistão)',
        description: 'Empurre a perna lateralmente em linha inteiramente reta, girando o quadril para baixo e travando a perna de apoio em 180°.',
        svgPath: 'M 30,80 L 30,58 L 15,55 L 68,55',
        annotations: ['Chute em linha reta (pistão)', 'Calcanhar lidera impacto', 'Alinhamento completo do calcanhar com quadril e ombros']
      },
      {
        frame: 3,
        label: 'Recolhimento Estrito',
        description: 'Puxe o calcanhar de volta para a câmara do peito antes de baixar o pé para o chão.',
        svgPath: 'M 30,80 L 30,58 L 20,50 M 22,62',
        annotations: ['Rápido recuo para evitar agarre', 'Aterrisse estável na base de guarda']
      }
    ]
  },
  {
    id: 'naeryo-chagi',
    nameKr: 'Naeryo Chagi',
    nameHangul: '내려차기',
    namePt: 'Chute Descendente (Canivete)',
    belt: 'green',
    gup: '6º Gup',
    category: 'kick',
    intro: 'Chute descendente traumático. A perna sobe perfeitamente esticada à altura máxima e cai verticalmente sobre a cabeça ou clavícula do oponente com força pesada.',
    tip: 'Suba a perna solta lateralmente por fora para desviar da guarda do rival, e bata em linha reta para baixo usando o calcanhar ou sola do pé.',
    executionSteps: [
      {
        frame: 1,
        label: 'Subida Livre',
        description: 'Arremesse a perna de trás inteiramente estendida para cima em uma órbita lateral oblíqua rápida.',
        svgPath: 'M 30,80 L 30,50 L 38,25',
        annotations: ['Perna esticada na subida', 'Eleve o quadril ao máximo', 'Guarda firme no tórax']
      },
      {
        frame: 2,
        label: 'Ponto Ápice',
        description: 'Alcance a altura máxima acima da linha dos olhos do adversário, estendendo a sola do pé.',
        svgPath: 'M 30,80 L 30,50 L 45,15',
        annotations: ['Alinhamento vertical máximo', 'Pé esticado']
      },
      {
        frame: 3,
        label: 'Queda do Machado',
        description: 'Dispare a perna em velocidade brutal para baixo, atingindo com o calcanhar ou sola.',
        svgPath: 'M 30,80 L 30,50 L 52,65',
        annotations: ['Impacto vertical de guilhotina', 'Tracionamento do calcanhar', 'Retome a posição de guarda com força pélvica']
      }
    ]
  },
  {
    id: 'poomsae-4',
    nameKr: 'Taegeuk Sa Jang',
    nameHangul: '태극 4장',
    namePt: 'Conceito do Trovão (Jin)',
    belt: 'green',
    gup: '7º Gup',
    category: 'poomsae',
    intro: 'O quarto poomsae. Simboliza o "Jin" (Trovão, poder imenso e dignidade). Introduz posturas de calcanhar duplo, ataques avançados de ponta de dedos e chutes laterais severos.',
    tip: 'Estabilize bem seu quadril antes de desferir o Yop Chagi. As defesas duplas de faca devem ser secas e geométricas.',
    executionSteps: [
      {
        frame: 1,
        label: 'Sonnal Momtong Makki em Postura Dwit Kubi',
        description: 'Vire à esquerda 90° e deslize para Dwit Kubi defensivo com defesa dupla Sonnal.',
        svgPath: 'M 30,80 M 30,50 L 22,48 M 28,48',
        annotations: ['Vire 90° à esquerda', 'Dwit Kubi firme', 'Sonnal duplo']
      },
      {
        frame: 2,
        label: 'Pyeron-son-keut Sewo Chireugi',
        description: 'Avance em Ap Kubi desferindo um ataque penetrante com a ponta dos dedos em linha reta.',
        svgPath: 'M 30,80 L 50,80 M 50,50 L 62,48',
        annotations: ['Ataque com a ponta dos dedos', 'Mão em lança vertical', 'Apoio firme na cintura']
      },
      {
        frame: 3,
        label: 'Yop Chagi Devastador',
        description: 'Chute lateral Yop Chagi com perna esquerda, aterrisse em Ap Kubi e aplique um soco rechaçado.',
        svgPath: 'M 30,80 L 40,40 L 65,80',
        annotations: ['Calcanhar linear focado', 'Estabilidade ao aterrissar']
      }
    ]
  },
  {
    id: 'poomsae-5',
    nameKr: 'Taegeuk Oh Jang',
    nameHangul: '태극 5장',
    namePt: 'Conceito do Vento (Seon)',
    belt: 'green',
    gup: '6º Gup',
    category: 'poomsae',
    intro: 'O quinto poomsae. Representa o "Seon" (Vento, flexibilidade silenciosa com força tempestuosa). Contém socos ao solo, chutes frontais longos seguidos de cotoveladas descendentes.',
    tip: 'Após o chute, execute a cotovelada (Palkup Chigi) com energia explosiva, utilizando a palma da mão oposta como apoio sonoro e estabilizador de força.',
    executionSteps: [
      {
        frame: 1,
        label: 'Are Makki Rebaixado',
        description: 'Vire à esquerda entre em Ap Kubi profundo realizando defesa Are Makki unilateral.',
        svgPath: 'M 30,80 M 30,50 L 24,58',
        annotations: ['Passo longo e firme', 'Defesa baixa focada']
      },
      {
        frame: 2,
        label: 'Malk-eun Chigi / Soco de Costas',
        description: 'Vire levemente trazendo o braço esquerdo em Deung-jumeok Chigi mantendo a postura de combate.',
        svgPath: 'M 30,80 M 35,45 L 45,45',
        annotations: ['Ataque rápido com costas do punho', 'Foco no oponente']
      },
      {
        frame: 3,
        label: 'Palkup Momtong Pyojeok Chigi',
        description: 'Chute Apt Chagi firme, avance em Ap Kubi e execute uma cotovelada circular impactando sobre a palma da própria mão oposta.',
        svgPath: 'M 30,80 L 45,40 L 60,80 M 60,50 L 58,45',
        annotations: ['Cotovelada no peito', 'Uso da palma como barreira de impacto', 'Aterrissagem sólida']
      }
    ]
  }
];

export const GLOSSARY = [
  { term: 'Dojang (도장)', meaning: 'Local ou espaço onde se realizam os treinos de Taekwondo.' },
  { term: 'Dobok (도복)', meaning: 'Uniforme sagrado de Taekwondo, composto por calça, paletó e faixa.' },
  { term: 'Charyeot (차렷)', meaning: 'Comando de atenção / sentido (ficar na postura com pés unidos).' },
  { term: 'Gyeong-nye (경례)', meaning: 'Comando de saudação / cumprimento respeitoso curvando o tronco.' },
  { term: 'Junbi (준비)', meaning: 'Comando de "preparar". Postura de prontidão com punhos cerrados em frente ao cinto.' },
  { term: 'Shijak (시작)', meaning: 'Comando de "começar" ou "iniciar" a execução.' },
  { term: 'Kalyoeo (갈려)', meaning: 'Comando de interrupção ou "separar" durante combates.' },
  { term: 'Guman (그만)', meaning: 'Comando de "parar" e retornar à posição inicial.' },
  { term: 'Kihap (기합)', meaning: 'Grito técnico de liberação de energia, canalizando a força abdominal.' },
  { term: 'Sabon-nim (사범님)', meaning: 'Mestre técnico instrutor encarregado das aulas.' },
  { term: 'Gup (급)', meaning: 'Grau elementar de faixa colorida, em contagem decrescente (10º ao 1º).' },
  { term: 'Dan (단)', meaning: 'Grau honorífico de faixa preta, em contagem crescente (1º ao 9º).' }
];
