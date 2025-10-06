import { useEffect, useState } from 'react';
import videoApi from '../api/videoApi';
import './VideoAdmin.css';

const VideoAdmin = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'tecnicas',
    videoUrl: '',
    thumbnail: '',
    duration: '',
    instructor: '',
    difficulty: 'iniciante',
    tags: '',
    isYouTube: false
  });

  const categories = [
    { value: 'tecnicas', label: 'Técnicas' },
    { value: 'competicoes', label: 'Competições' },
    { value: 'treinos', label: 'Treinos' }
  ];

  const difficulties = [
    { value: 'iniciante', label: 'Iniciante' },
    { value: 'intermediario', label: 'Intermediário' },
    { value: 'avancado', label: 'Avançado' },
    { value: 'todos', label: 'Todos os níveis' }
  ];

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const videoData = await videoApi.getAllVideos();
      setVideos(videoData);
    } catch (error) {
      console.error('Erro ao carregar vídeos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const videoData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (editingVideo) {
        await videoApi.updateVideo(editingVideo.id, videoData);
      } else {
        await videoApi.addVideo(videoData);
      }

      setShowAddForm(false);
      setEditingVideo(null);
      setFormData({
        title: '',
        description: '',
        category: 'tecnicas',
        videoUrl: '',
        thumbnail: '',
        duration: '',
        instructor: '',
        difficulty: 'iniciante',
        tags: '',
        isYouTube: false
      });
      loadVideos();
    } catch (error) {
      console.error('Erro ao salvar vídeo:', error);
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData({
      ...video,
      tags: video.tags.join(', ')
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este vídeo?')) {
      try {
        await videoApi.deleteVideo(id);
        loadVideos();
      } catch (error) {
        console.error('Erro ao deletar vídeo:', error);
      }
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingVideo(null);
    setFormData({
      title: '',
      description: '',
      category: 'tecnicas',
      videoUrl: '',
      thumbnail: '',
      duration: '',
      instructor: '',
      difficulty: 'iniciante',
      tags: '',
      isYouTube: false
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="video-admin-loading">
        <div className="loading-spinner"></div>
        <p>Carregando administração...</p>
      </div>
    );
  }

  return (
    <div className="video-admin">
      <div className="admin-header">
        <h2>🎬 Administração de Vídeos</h2>
        <button 
          className="add-video-btn"
          onClick={() => setShowAddForm(true)}
        >
          ➕ Adicionar Vídeo
        </button>
      </div>

      {showAddForm && (
        <div className="add-video-form">
          <h3>{editingVideo ? 'Editar Vídeo' : 'Adicionar Novo Vídeo'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Título *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Categoria *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Descrição *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>URL do Vídeo *</label>
                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>URL da Thumbnail</label>
                <input
                  type="url"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Duração (ex: 5:30)</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="5:30"
                />
              </div>
              <div className="form-group">
                <label>Instrutor *</label>
                <input
                  type="text"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Dificuldade</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                >
                  {difficulties.map(diff => (
                    <option key={diff.value} value={diff.value}>
                      {diff.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="chutes, básico, técnicas"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isYouTube"
                    checked={formData.isYouTube}
                    onChange={(e) => setFormData(prev => ({ ...prev, isYouTube: e.target.checked }))}
                  />
                  <span>Vídeo do YouTube</span>
                </label>
                <small>Marque se o vídeo for do YouTube (use URL de embed)</small>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">
                {editingVideo ? 'Atualizar' : 'Adicionar'} Vídeo
              </button>
              <button type="button" onClick={handleCancel} className="cancel-btn">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="videos-list">
        <h3>Vídeos Cadastrados ({videos.length})</h3>
        <div className="videos-table">
          <div className="table-header">
            <div>Título</div>
            <div>Categoria</div>
            <div>Instrutor</div>
            <div>Visualizações</div>
            <div>Curtidas</div>
            <div>Ações</div>
          </div>
          {videos.map(video => (
            <div key={video.id} className="table-row">
              <div className="video-title">
                <strong>{video.title}</strong>
                <small>{video.difficulty}</small>
              </div>
              <div className="video-category">
                <span className={`category-badge ${video.category}`}>
                  {categories.find(c => c.value === video.category)?.label}
                </span>
              </div>
              <div className="video-instructor">{video.instructor}</div>
              <div className="video-stats">
                <span>👁️ {formatNumber(video.views)}</span>
              </div>
              <div className="video-likes">
                <span>❤️ {formatNumber(video.likes)}</span>
              </div>
              <div className="video-actions">
                <button 
                  className="edit-btn"
                  onClick={() => handleEdit(video)}
                >
                  ✏️
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(video.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoAdmin;
