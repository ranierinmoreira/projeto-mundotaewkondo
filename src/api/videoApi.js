// API Mock para gerenciamento de vídeos do Mundo Taekwondo

// Simula um banco de dados de vídeos
let videos = [
  {
    id: 1,
    title: "Técnicas Básicas de Chute",
    description: "Aprenda os fundamentos dos chutes no Taekwondo com demonstrações práticas",
    category: "tecnicas",
    thumbnail: "/videos/thumbnails/tecnicas-basicas.svg",
    videoUrl: "/videos/tecnicas-basicas.mp4",
    duration: "5:30",
    views: 1250,
    likes: 89,
    uploadDate: "2024-01-15",
    tags: ["chutes", "básico", "técnicas", "iniciante"],
    instructor: "Mestre Kim",
    difficulty: "iniciante",
    isYouTube: false
  },
  {
    id: 2,
    title: "Competição Olímpica 2024",
    description: "Melhores momentos das competições de Taekwondo nos Jogos Olímpicos",
    category: "competicoes",
    thumbnail: "/videos/thumbnails/competicoes-olimpiadas.svg",
    videoUrl: "/videos/competicoes-olimpiadas.mp4",
    duration: "8:45",
    views: 3420,
    likes: 156,
    uploadDate: "2024-08-10",
    tags: ["olimpíadas", "competição", "alto nível", "2024"],
    instructor: "Vários Atletas",
    difficulty: "todos",
    isYouTube: false
  },
  {
    id: 3,
    title: "Treino de Flexibilidade",
    description: "Exercícios específicos para melhorar a flexibilidade no Taekwondo",
    category: "treinos",
    thumbnail: "/videos/thumbnails/treino-flexibilidade.svg",
    videoUrl: "/videos/treino-flexibilidade.mp4",
    duration: "6:15",
    views: 890,
    likes: 67,
    uploadDate: "2024-01-20",
    tags: ["flexibilidade", "aquecimento", "alongamento", "condicionamento"],
    instructor: "Professora Ana",
    difficulty: "iniciante",
    isYouTube: false
  },
  {
    id: 4,
    title: "Formas (Poomsae) Avançadas",
    description: "Demonstração completa de formas tradicionais do Taekwondo",
    category: "tecnicas",
    thumbnail: "/videos/thumbnails/tecnicas-basicas.svg",
    videoUrl: "/videos/taekwondo-hero.mp4",
    duration: "12:20",
    views: 2100,
    likes: 134,
    uploadDate: "2024-02-05",
    tags: ["poomsae", "formas", "tradicional", "avançado"],
    instructor: "Mestre Park",
    difficulty: "avançado",
    isYouTube: false
  },
  {
    id: 5,
    title: "Campeonato Mundial 2023",
    description: "Highlights emocionantes do campeonato mundial de Taekwondo",
    category: "competicoes",
    thumbnail: "/videos/thumbnails/competicoes-olimpiadas.svg",
    videoUrl: "/videos/taekwondo-hero.mp4",
    duration: "15:30",
    views: 5670,
    likes: 298,
    uploadDate: "2023-12-15",
    tags: ["mundial", "competição", "2023", "highlights"],
    instructor: "Vários Atletas",
    difficulty: "todos",
    isYouTube: false
  },
  {
    id: 6,
    title: "Aquecimento e Preparação",
    description: "Rotina completa de aquecimento para treinos de Taekwondo",
    category: "treinos",
    thumbnail: "/videos/thumbnails/treino-flexibilidade.svg",
    videoUrl: "/videos/taekwondo-hero.mp4",
    duration: "7:45",
    views: 1450,
    likes: 98,
    uploadDate: "2024-01-10",
    tags: ["aquecimento", "preparação", "treino", "condicionamento"],
    instructor: "Professor Carlos",
    difficulty: "iniciante",
    isYouTube: false
  },
  {
    id: 7,
    title: "Defesas Avançadas",
    description: "Técnicas avançadas de defesa e contra-ataque",
    category: "tecnicas",
    thumbnail: "/videos/thumbnails/tecnicas-basicas.svg",
    videoUrl: "/videos/taekwondo-hero.mp4",
    duration: "9:20",
    views: 1780,
    likes: 112,
    uploadDate: "2024-02-20",
    tags: ["defesa", "contra-ataque", "avançado", "técnicas"],
    instructor: "Mestre Lee",
    difficulty: "avançado",
    isYouTube: false
  },
  {
    id: 8,
    title: "Treino de Resistência",
    description: "Exercícios para melhorar a resistência física no Taekwondo",
    category: "treinos",
    thumbnail: "/videos/thumbnails/treino-flexibilidade.svg",
    videoUrl: "/videos/taekwondo-hero.mp4",
    duration: "11:15",
    views: 920,
    likes: 76,
    uploadDate: "2024-01-25",
    tags: ["resistência", "condicionamento", "físico", "treino"],
    instructor: "Professora Maria",
    difficulty: "intermediário",
    isYouTube: false
  }
];

// Simula delay de rede
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// API Functions
export const videoApi = {
  // Buscar todos os vídeos
  async getAllVideos() {
    await delay(500);
    return [...videos];
  },

  // Buscar vídeo por ID
  async getVideoById(id) {
    await delay(300);
    const video = videos.find(v => v.id === parseInt(id));
    if (!video) {
      throw new Error('Vídeo não encontrado');
    }
    return video;
  },

  // Buscar vídeos por categoria
  async getVideosByCategory(category) {
    await delay(400);
    if (category === 'todos') {
      return [...videos];
    }
    return videos.filter(video => video.category === category);
  },

  // Buscar vídeos por termo
  async searchVideos(query) {
    await delay(600);
    const searchTerm = query.toLowerCase();
    return videos.filter(video => 
      video.title.toLowerCase().includes(searchTerm) ||
      video.description.toLowerCase().includes(searchTerm) ||
      video.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      video.instructor.toLowerCase().includes(searchTerm)
    );
  },

  // Adicionar novo vídeo
  async addVideo(videoData) {
    await delay(800);
    const newVideo = {
      id: Math.max(...videos.map(v => v.id)) + 1,
      ...videoData,
      views: 0,
      likes: 0,
      uploadDate: new Date().toISOString().split('T')[0]
    };
    videos.push(newVideo);
    return newVideo;
  },

  // Atualizar vídeo
  async updateVideo(id, updateData) {
    await delay(600);
    const index = videos.findIndex(v => v.id === parseInt(id));
    if (index === -1) {
      throw new Error('Vídeo não encontrado');
    }
    videos[index] = { ...videos[index], ...updateData };
    return videos[index];
  },

  // Deletar vídeo
  async deleteVideo(id) {
    await delay(500);
    const index = videos.findIndex(v => v.id === parseInt(id));
    if (index === -1) {
      throw new Error('Vídeo não encontrado');
    }
    const deletedVideo = videos.splice(index, 1)[0];
    return deletedVideo;
  },

  // Incrementar visualizações
  async incrementViews(id) {
    await delay(200);
    const video = videos.find(v => v.id === parseInt(id));
    if (video) {
      video.views += 1;
    }
    return video;
  },

  // Curtir/descurtir vídeo
  async toggleLike(id) {
    await delay(300);
    const video = videos.find(v => v.id === parseInt(id));
    if (video) {
      video.likes += 1;
    }
    return video;
  },

  // Buscar vídeos mais populares
  async getPopularVideos(limit = 5) {
    await delay(400);
    return videos
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  },

  // Buscar vídeos mais recentes
  async getRecentVideos(limit = 5) {
    await delay(400);
    return videos
      .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
      .slice(0, limit);
  },

  // Buscar vídeos por dificuldade
  async getVideosByDifficulty(difficulty) {
    await delay(400);
    return videos.filter(video => video.difficulty === difficulty);
  },

  // Buscar vídeos por instrutor
  async getVideosByInstructor(instructor) {
    await delay(400);
    return videos.filter(video => 
      video.instructor.toLowerCase().includes(instructor.toLowerCase())
    );
  },

  // Obter estatísticas
  async getStats() {
    await delay(300);
    const totalVideos = videos.length;
    const totalViews = videos.reduce((sum, video) => sum + video.views, 0);
    const totalLikes = videos.reduce((sum, video) => sum + video.likes, 0);
    const categories = [...new Set(videos.map(v => v.category))];
    
    return {
      totalVideos,
      totalViews,
      totalLikes,
      categories: categories.length,
      averageViews: Math.round(totalViews / totalVideos),
      averageLikes: Math.round(totalLikes / totalVideos)
    };
  }
};

export default videoApi;
