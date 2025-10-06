import { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('todas');

  // Dados das imagens de taekwondo
  const taekwondoImages = [
    {
      id: 1,
      src: '/images/lutas/chute-frontal-ap-chagi.jpg',
      alt: 'Chute frontal Ap Chagi em ação',
      title: 'Ap Chagi - Chute Frontal',
      description: 'Técnica fundamental do taekwondo, o chute frontal é uma das primeiras técnicas aprendidas pelos praticantes.',
      category: 'tecnicas',
      tags: ['chute', 'frontal', 'fundamental']
    },
    {
      id: 2,
      src: '/images/lutas/chute-lateral-yeop-chagi.jpg',
      alt: 'Chute lateral Yeop Chagi',
      title: 'Yeop Chagi - Chute Lateral',
      description: 'O chute lateral é uma técnica poderosa que utiliza a força lateral do corpo para maximizar o impacto.',
      category: 'tecnicas',
      tags: ['chute', 'lateral', 'poderoso']
    },
    {
      id: 3,
      src: '/images/competicoes/olimpiadas-2024.jpg',
      alt: 'Competição de taekwondo nas Olimpíadas',
      title: 'Jogos Olímpicos 2024',
      description: 'Taekwondo nas Olimpíadas de Paris 2024, mostrando o nível mundial da modalidade.',
      category: 'competicoes',
      tags: ['olimpiadas', 'competição', 'mundial']
    },
    {
      id: 4,
      src: '/images/treinos/treino-flexibilidade.jpg',
      alt: 'Treino de flexibilidade em taekwondo',
      title: 'Treino de Flexibilidade',
      description: 'A flexibilidade é fundamental no taekwondo para executar chutes altos e técnicas avançadas.',
      category: 'treinos',
      tags: ['flexibilidade', 'treino', 'preparação']
    },
    {
      id: 5,
      src: '/images/lutas/dollyo-chagi-circular.jpg',
      alt: 'Chute circular Dollyo Chagi',
      title: 'Dollyo Chagi - Chute Circular',
      description: 'O chute circular é uma das técnicas mais espetaculares do taekwondo, combinando velocidade e precisão.',
      category: 'tecnicas',
      tags: ['chute', 'circular', 'espetacular']
    },
    {
      id: 6,
      src: '/images/competicoes/campeonato-mundial.jpg',
      alt: 'Campeonato Mundial de Taekwondo',
      title: 'Campeonato Mundial',
      description: 'Os melhores atletas do mundo competindo no Campeonato Mundial de Taekwondo.',
      category: 'competicoes',
      tags: ['mundial', 'atletas', 'competição']
    },
    {
      id: 7,
      src: '/images/treinos/treino-grupo.jpg',
      alt: 'Treino em grupo de taekwondo',
      title: 'Treino em Grupo',
      description: 'O trabalho em equipe e o respeito são valores fundamentais no taekwondo.',
      category: 'treinos',
      tags: ['grupo', 'equipe', 'respeito']
    },
    {
      id: 8,
      src: '/images/lutas/bandae-dollyo-chagi.jpg',
      alt: 'Chute circular reverso Bandae Dollyo Chagi',
      title: 'Bandae Dollyo Chagi',
      description: 'Técnica avançada que combina rotação e chute circular para máxima eficiência.',
      category: 'tecnicas',
      tags: ['chute', 'circular', 'avançado']
    }
  ];

  const categories = [
    { id: 'todas', label: 'Todas', icon: '🖼️' },
    { id: 'tecnicas', label: 'Técnicas', icon: '🥋' },
    { id: 'competicoes', label: 'Competições', icon: '🏆' },
    { id: 'treinos', label: 'Treinos', icon: '💪' }
  ];

  const filteredImages = selectedCategory === 'todas' 
    ? taekwondoImages 
    : taekwondoImages.filter(img => img.category === selectedCategory);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="image-gallery">
      <div className="gallery-header">
        <h2>🥋 Galeria de Lutas de Taekwondo</h2>
        <p>Explore as técnicas, competições e treinos que fazem do taekwondo uma arte marcial única</p>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-label">{category.label}</span>
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredImages.map(image => (
          <div key={image.id} className="gallery-item" onClick={() => openModal(image)}>
            <div className="image-container">
              <img 
                src={image.src} 
                alt={image.alt}
                onError={(e) => {
                  e.target.src = '/images/placeholder-taekwondo.svg';
                  e.target.alt = 'Imagem de taekwondo não disponível';
                }}
              />
              <div className="image-overlay">
                <div className="overlay-content">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                  <div className="image-tags">
                    {image.tags.map(tag => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <img src={selectedImage.src} alt={selectedImage.alt} className="modal-image" />
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
              <div className="modal-tags">
                {selectedImage.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
