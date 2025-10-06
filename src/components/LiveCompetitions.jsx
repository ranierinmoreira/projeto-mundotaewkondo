import { useEffect, useState } from 'react';
import taekwondoApi, { formatDate, getCountryFlag } from '../api/taekwondoApi';
import './LiveCompetitions.css';

const LiveCompetitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      // Carregar áreas disponíveis
      const areasData = await taekwondoApi.getAreas();
      if (areasData && areasData.data) {
        setAreas(areasData.data);
      }

      // Carregar competições principais
      const competitionsData = await taekwondoApi.getCompetitions();
      if (competitionsData && competitionsData.data) {
        setCompetitions(competitionsData.data);
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dados das competições. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  const loadCompetitionsByArea = async (areaId) => {
    try {
      setLoading(true);
      const data = await taekwondoApi.getCompetitions(areaId);
      if (data && data.data) {
        setCompetitions(data.data);
      }
      setSelectedArea(areaId);
    } catch (err) {
      console.error('Erro ao carregar competições por área:', err);
      setError('Erro ao carregar competições desta região.');
    } finally {
      setLoading(false);
    }
  };

  const getCompetitionTypeIcon = (name) => {
    const nameLower = name.toLowerCase();
    
    if (nameLower.includes('olympic') || nameLower.includes('olimpic')) {
      return '🏅';
    } else if (nameLower.includes('world') || nameLower.includes('mundial')) {
      return '🌍';
    } else if (nameLower.includes('championship') || nameLower.includes('campeonato')) {
      return '🏆';
    } else if (nameLower.includes('cup') || nameLower.includes('copa')) {
      return '🥇';
    } else if (nameLower.includes('grand prix') || nameLower.includes('prix')) {
      return '💎';
    } else if (nameLower.includes('continental') || nameLower.includes('continental')) {
      return '🗺️';
    } else {
      return '🥋';
    }
  };

  const getCompetitionStatus = (status) => {
    switch (status) {
      case 'active':
        return { text: 'Ativo', class: 'status-active', icon: '🔴' };
      case 'finished':
        return { text: 'Finalizado', class: 'status-finished', icon: '✅' };
      case 'scheduled':
        return { text: 'Agendado', class: 'status-scheduled', icon: '⏰' };
      default:
        return { text: 'Desconhecido', class: 'status-unknown', icon: '❓' };
    }
  };

  if (loading && competitions.length === 0) {
    return (
      <div className="live-competitions">
        <div className="competitions-header">
          <h2>🏆 Competições ao Vivo</h2>
          <p>Dados reais de competições de taekwondo em todo o mundo</p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando competições...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="live-competitions">
        <div className="competitions-header">
          <h2>🏆 Competições ao Vivo</h2>
          <p>Dados reais de competições de taekwondo em todo o mundo</p>
        </div>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p>{error}</p>
          <button onClick={loadInitialData} className="retry-button">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="live-competitions">
      <div className="competitions-header">
        <h2>🏆 Competições ao Vivo</h2>
        <p>Dados reais de competições de taekwondo em todo o mundo</p>
      </div>

      {/* Filtro por região */}
      <div className="area-filter">
        <h3>Filtrar por Região:</h3>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${selectedArea === null ? 'active' : ''}`}
            onClick={() => loadCompetitionsByArea(null)}
          >
            🌍 Todas
          </button>
          {areas.slice(0, 10).map(area => (
            <button
              key={area.area_id}
              className={`filter-btn ${selectedArea === area.area_id ? 'active' : ''}`}
              onClick={() => loadCompetitionsByArea(area.area_id)}
            >
              {getCountryFlag(area.country_code)} {area.name}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de competições */}
      <div className="competitions-grid">
        {competitions.map(competition => {
          const status = getCompetitionStatus(competition.status);
          
          return (
            <div key={competition.competition_id} className="competition-card">
              <div className="competition-header">
                <div className="competition-icon">
                  {getCompetitionTypeIcon(competition.name)}
                </div>
                <div className="competition-info">
                  <h3>{competition.name}</h3>
                  <p className="competition-area">
                    {getCountryFlag(competition.area?.country_code)} {competition.area?.name}
                  </p>
                </div>
                <div className={`competition-status ${status.class}`}>
                  <span className="status-icon">{status.icon}</span>
                  <span className="status-text">{status.text}</span>
                </div>
              </div>

              <div className="competition-details">
                {competition.start_date && (
                  <div className="detail-item">
                    <span className="detail-label">📅 Início:</span>
                    <span className="detail-value">{formatDate(competition.start_date)}</span>
                  </div>
                )}
                
                {competition.end_date && (
                  <div className="detail-item">
                    <span className="detail-label">🏁 Fim:</span>
                    <span className="detail-value">{formatDate(competition.end_date)}</span>
                  </div>
                )}

                {competition.gender && (
                  <div className="detail-item">
                    <span className="detail-label">⚥ Gênero:</span>
                    <span className="detail-value">{competition.gender}</span>
                  </div>
                )}

                {competition.category && (
                  <div className="detail-item">
                    <span className="detail-label">📊 Categoria:</span>
                    <span className="detail-value">{competition.category}</span>
                  </div>
                )}
              </div>

              <div className="competition-actions">
                <button 
                  className="action-btn primary"
                  onClick={() => window.open(`https://dsg-api.com/doc/taekwondo/get_competitions/696/?competition_id=${competition.competition_id}`, '_blank')}
                >
                  📊 Ver Detalhes
                </button>
                <button 
                  className="action-btn secondary"
                  onClick={() => window.open(`https://dsg-api.com/doc/taekwondo/get_matches/696/?competition_id=${competition.competition_id}`, '_blank')}
                >
                  🥋 Ver Lutas
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {competitions.length === 0 && !loading && (
        <div className="no-competitions">
          <div className="no-data-icon">🥋</div>
          <h3>Nenhuma competição encontrada</h3>
          <p>Tente selecionar uma região diferente ou verifique sua conexão.</p>
        </div>
      )}

      {loading && competitions.length > 0 && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Atualizando dados...</p>
        </div>
      )}
    </div>
  );
};

export default LiveCompetitions;
