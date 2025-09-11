// Configurações do site Mundo Taekwondo

export const SITE_CONFIG = {
  // Informações básicas
  title: 'Mundo Taekwondo - Portal Oficial da Arte Marcial Coreana',
  description: 'Portal completo sobre Taekwondo: história, técnicas, graduações, eventos e muito mais. Descubra o mundo da arte marcial coreana.',
  keywords: 'taekwondo, arte marcial, coreana, graduações, técnicas, eventos, competições',
  author: 'Mundo Taekwondo',
  
  // URLs e links
  url: 'https://mundotaekwondo.com',
  logo: '/vite.svg',
  
  // Redes sociais
  social: {
    facebook: 'https://facebook.com/mundotaekwondo',
    instagram: 'https://instagram.com/mundotaekwondo',
    youtube: 'https://youtube.com/mundotaekwondo',
    twitter: 'https://twitter.com/mundotaekwondo'
  },
  
  // Configurações de vídeo
  video: {
    hero: '/videos/taekwondo-hero.mp4',
    autoplay: true,
    muted: true,
    loop: true
  },
  
  // Configurações de animação
  animation: {
    duration: 0.8,
    delay: 0.1,
    easing: 'ease'
  },
  
  // Configurações de cores
  colors: {
    primary: '#ffd700',
    secondary: '#1e3c72',
    background: '#0a192f',
    text: '#ffffff',
    textSecondary: '#e0e0e0'
  },
  
  // Configurações de layout
  layout: {
    maxWidth: '1200px',
    padding: '2rem',
    borderRadius: '20px'
  }
};

export default SITE_CONFIG;
