import { useEffect, useState } from 'react';
import videoApi from '../api/videoApi';
import './VideoGallery.css';
import VideoPlayer from './VideoPlayer';

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState(null);

  const categories = [
    { id: 'todos', name: 'Todos', icon: '🎬' },
    { id: 'tecnicas', name: 'Técnicas', icon: '🥋' },
    { id: 'competicoes', name: 'Competições', icon: '🏆' },
    { id: 'treinos', name: 'Treinos', icon: '💪' }
  ];

  useEffect(() => {
    loadVideos();
    loadStats();
  }, [selectedCategory, searchQuery]);

  const loadVideos = async () => {
    try {
      setLoading(true);
      let videoData;
      
      if (searchQuery.trim()) {
        videoData = await videoApi.searchVideos(searchQuery);
      } else {
        videoData = await videoApi.getVideosByCategory(selectedCategory);
      }
      
      setVideos(videoData);
    } catch (error) {
      console.error('Erro ao carregar vídeos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await videoApi.getStats();
      setStats(statsData);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const openVideoModal = async (video) => {
    setSelectedVideo(video);
    // Incrementa visualizações quando o vídeo é aberto
    try {
      await videoApi.incrementViews(video.id);
    } catch (error) {
      console.error('Erro ao incrementar visualizações:', error);
    }
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Limpa busca ao mudar categoria
  };

  if (loading) {
    return (
      <div className="video-gallery-loading">
        <div className="loading-spinner"></div>
        <p>Carregando vídeos...</p>
      </div>
    );
  }

  return (
    <div className="video-gallery">
      <div className="gallery-header">
        <h2>🎬 Galeria de Vídeos</h2>
        <p>Explore nossa coleção de vídeos sobre Taekwondo</p>
        {stats && (
          <div className="gallery-stats">
            <span>📹 {stats.totalVideos} vídeos</span>
            <span>👁️ {formatNumber(stats.totalViews)} visualizações</span>
            <span>❤️ {formatNumber(stats.totalLikes)} curtidas</span>
          </div>
        )}
      </div>

      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar vídeos, instrutores, técnicas..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>

      <div className="videos-grid">
        {videos.map(video => (
          <div key={video.id} className="video-card" onClick={() => openVideoModal(video)}>
            <div className="video-thumbnail">
              {video.thumbnail ? (
                <div className="thumbnail-image" style={{ backgroundImage: `url(${video.thumbnail})` }}>
                  <div className="thumbnail-overlay">
                    <span className="play-icon">▶️</span>
                    <span className="video-duration">{video.duration}</span>
                  </div>
                </div>
              ) : (
                <div className="thumbnail-placeholder">
                  <span className="play-icon">▶️</span>
                  <span className="video-duration">{video.duration}</span>
                </div>
              )}
            </div>
            <div className="video-info">
              <h3 className="video-title">{video.title}</h3>
              <p className="video-description">{video.description}</p>
              <div className="video-meta">
                <span className="instructor">👨‍🏫 {video.instructor}</span>
                <span className="difficulty">📊 {video.difficulty}</span>
              </div>
              <div className="video-stats">
                <span className="stat">
                  👁️ {formatNumber(video.views)} visualizações
                </span>
                <span className="stat">
                  ❤️ {formatNumber(video.likes)} curtidas
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <VideoPlayer video={selectedVideo} onClose={closeVideoModal} />
      )}
    </div>
  );
};

export default VideoGallery;
