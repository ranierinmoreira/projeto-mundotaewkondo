// Constantes do portal Mundo Taekwondo

export const TAEKWONDO_INFO = {
  name: 'Mundo Taekwondo',
  description: 'Portal completo sobre Taekwondo: história, técnicas, graduações, eventos e muito mais.',
  author: 'Mundo Taekwondo',
  version: '1.0.0'
};

export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Início', href: '#home' },
  { id: 'sobre', label: 'Sobre', href: '#sobre' },
  { id: 'graduacoes', label: 'Graduações', href: '#graduacoes' },
  { id: 'tecnicas', label: 'Técnicas', href: '#tecnicas' },
  { id: 'eventos', label: 'Eventos', href: '#eventos' },
  { id: 'contato', label: 'Contato', href: '#contato' }
];

export const BENEFITS = {
  fisicos: [
    'Melhora do condicionamento físico',
    'Desenvolvimento da flexibilidade',
    'Fortalecimento muscular',
    'Melhora da coordenação motora'
  ],
  mentais: [
    'Disciplina e autocontrole',
    'Concentração e foco',
    'Confiança e autoestima',
    'Redução do estresse'
  ],
  sociais: [
    'Respeito e cortesia',
    'Trabalho em equipe',
    'Liderança',
    'Amizades duradouras'
  ]
};

export const GRADUATIONS = {
  coloridas: [
    { name: 'Branca', gup: '10º Gup', color: 'branca' },
    { name: 'Amarela', gup: '9º Gup', color: 'amarela' },
    { name: 'Laranja', gup: '8º Gup', color: 'laranja' },
    { name: 'Verde', gup: '7º Gup', color: 'verde' },
    { name: 'Azul', gup: '6º Gup', color: 'azul' },
    { name: 'Vermelho', gup: '5º Gup', color: 'vermelho' }
  ],
  pretas: [
    { name: '1º Dan', color: 'preta' },
    { name: '2º Dan', color: 'preta' },
    { name: '3º Dan', color: 'preta' },
    { name: '4º Dan', color: 'preta' },
    { name: '5º Dan', color: 'preta' },
    { name: '6º Dan', color: 'preta' },
    { name: '7º Dan', color: 'preta' },
    { name: '8º Dan', color: 'preta' }
  ]
};

export const TECHNIQUES = {
  chutes: [
    'Ap Chagi (Chute frontal)',
    'Yeop Chagi (Chute lateral)',
    'Dollyo Chagi (Chute circular)',
    'Bandae Dollyo Chagi (Chute circular reverso)'
  ],
  golpes: [
    'Jab (Golpe direto)',
    'Cross (Cruzado)',
    'Hook (Gancho)',
    'Uppercut (Gancho ascendente)'
  ],
  defesas: [
    'Arae Makgi (Defesa baixa)',
    'Momtong Makgi (Defesa média)',
    'Olgul Makgi (Defesa alta)',
    'Hecho Makgi (Defesa dupla)'
  ]
};

export const EVENTS = [
  {
    title: '🏆 Jogos Olímpicos',
    description: 'O Taekwondo faz parte do programa olímpico desde Sydney 2000, com competições em categorias de peso para homens e mulheres.'
  },
  {
    title: '🌍 Campeonatos Mundiais',
    description: 'Organizados pela World Taekwondo Federation (WTF), são realizados a cada dois anos em diferentes países.'
  },
  {
    title: '🏅 Copa do Mundo',
    description: 'Competição anual que reúne os melhores atletas do mundo em diferentes categorias e modalidades.'
  }
];

export const CONTACT_INFO = {
  email: 'contato@mundotaekwondo.com',
  phone: '(24) 98144-4324',
  location: 'Três Rios, RJ - Brasil'
};
