import { useState } from 'react';

const InteractiveSection = () => {
  const [activeTab, setActiveTab] = useState('beneficios');

  const tabs = [
    { id: 'beneficios', label: 'Benefícios', icon: '💪' },
    { id: 'graduacoes', label: 'Graduações', icon: '🥋' },
    { id: 'tecnicas', label: 'Técnicas', icon: '⚡' },
    { id: 'eventos', label: 'Eventos', icon: '🏆' }
  ];

  const content = {
    beneficios: {
      title: 'Benefícios do Taekwondo',
      items: [
        { icon: '💪', title: 'Físicos', desc: 'Melhora do condicionamento físico, flexibilidade e coordenação' },
        { icon: '🧠', title: 'Mentais', desc: 'Disciplina, concentração e redução do estresse' },
        { icon: '🤝', title: 'Sociais', desc: 'Respeito, trabalho em equipe e liderança' }
      ]
    },
    graduacoes: {
      title: 'Sistema de Graduações',
      items: [
        { icon: '⚪', title: 'Faixas Coloridas', desc: 'Do 10º ao 5º Gup (Branca ao Vermelho)' },
        { icon: '⚫', title: 'Faixas Pretas', desc: 'Do 1º ao 8º Dan (Mestres)' }
      ]
    },
    tecnicas: {
      title: 'Técnicas Fundamentais',
      items: [
        { icon: '🦵', title: 'Chutes (Chagi)', desc: 'Ap Chagi, Yeop Chagi, Dollyo Chagi' },
        { icon: '👊', title: 'Golpes (Jireugi)', desc: 'Jab, Cross, Hook, Uppercut' },
        { icon: '🛡️', title: 'Defesas (Makgi)', desc: 'Arae, Momtong, Olgul Makgi' }
      ]
    },
    eventos: {
      title: 'Eventos e Competições',
      items: [
        { icon: '🏅', title: 'Jogos Olímpicos', desc: 'Modalidade olímpica desde Sydney 2000' },
        { icon: '🌍', title: 'Campeonatos Mundiais', desc: 'Organizados pela World Taekwondo Federation' },
        { icon: '🏆', title: 'Copa do Mundo', desc: 'Competição anual com os melhores atletas' }
      ]
    }
  };

  return (
    <div className="interactive-section">
      <div className="tabs-container">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
      
      <div className="tab-content">
        <h3>{content[activeTab].title}</h3>
        <div className="content-grid">
          {content[activeTab].items.map((item, index) => (
            <div key={index} className="content-item">
              <div className="item-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveSection;
