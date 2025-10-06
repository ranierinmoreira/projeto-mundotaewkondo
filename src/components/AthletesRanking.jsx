import { useEffect, useState } from 'react';
import taekwondoApi, { formatDate, getCountryFlag } from '../api/taekwondoApi';
import './AthletesRanking.css';

const AthletesRanking = () => {
  const [athletes, setAthletes] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('athletes');
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      // Carregar disciplinas disponíveis
      const disciplinesData = await taekwondoApi.getDisciplines();
      if (disciplinesData && disciplinesData.data) {
        setDisciplines(disciplinesData.data);
      }

      // Carregar atletas
      await loadAthletes();
      
      // Carregar rankings
      await loadRankings();
      
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dados dos atletas. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  const loadAthletes = async (discipline = null) => {
    try {
      const data = await taekwondoApi.getAthletes();
      if (data && data.data) {
        setAthletes(data.data);
      }
    } catch (err) {
      console.error('Erro ao carregar atletas:', err);
    }
  };

  const loadRankings = async (discipline = null) => {
    try {
      const data = await taekwondoApi.getRankings();
      if (data && data.data) {
        setRankings(data.data);
      }
    } catch (err) {
      console.error('Erro ao carregar rankings:', err);
    }
  };

  const getAthleteGenderIcon = (gender) => {
    switch (gender?.toLowerCase()) {
      case 'male':
      case 'masculino':
        return '♂️';
      case 'female':
      case 'feminino':
        return '♀️';
      default:
        return '⚥';
    }
  };

  const getAthleteWeightClass = (weight) => {
    if (!weight) return 'Não especificado';
    
    // Categorias de peso comuns no taekwondo
    const weightNum = parseFloat(weight);
    
    if (weightNum <= 49) return 'Mosca (≤49kg)';
    if (weightNum <= 53) return 'Galo (49-53kg)';
    if (weightNum <= 57) return 'Pena (53-57kg)';
    if (weightNum <= 62) return 'Leve (57-62kg)';
    if (weightNum <= 67) return 'Meio-médio (62-67kg)';
    if (weightNum <= 72) return 'Médio (67-72kg)';
    if (weightNum <= 78) return 'Meio-pesado (72-78kg)';
    if (weightNum <= 85) return 'Pesado (78-85kg)';
    return 'Super pesado (>85kg)';
  };

  const getRankingPosition = (position) => {
    if (!position) return 'N/A';
    
    const pos = parseInt(position);
    if (pos === 1) return '🥇';
    if (pos === 2) return '🥈';
    if (pos === 3) return '🥉';
    
    return `#${pos}`;
  };

  const getDisciplineIcon = (discipline) => {
    const name = discipline?.name?.toLowerCase() || '';
    
    if (name.includes('kyorugi') || name.includes('sparring')) {
      return '🥊';
    } else if (name.includes('poomsae') || name.includes('form')) {
      return '🎭';
    } else if (name.includes('team')) {
      return '👥';
    } else if (name.includes('para') || name.includes('paralympic')) {
      return '♿';
    } else {
      return '🥋';
    }
  };

  if (loading && athletes.length === 0 && rankings.length === 0) {
    return (
      <div className="athletes-ranking">
        <div className="athletes-header">
          <h2>🏅 Atletas e Rankings</h2>
          <p>Rankings mundiais e informações dos melhores atletas de taekwondo</p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados dos atletas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="athletes-ranking">
        <div className="athletes-header">
          <h2>🏅 Atletas e Rankings</h2>
          <p>Rankings mundiais e informações dos melhores atletas de taekwondo</p>
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
    <div className="athletes-ranking">
      <div className="athletes-header">
        <h2>🏅 Atletas e Rankings</h2>
        <p>Rankings mundiais e informações dos melhores atletas de taekwondo</p>
      </div>

      {/* Tabs */}
      <div className="athletes-tabs">
        <button
          className={`tab-btn ${activeTab === 'athletes' ? 'active' : ''}`}
          onClick={() => setActiveTab('athletes')}
        >
          👥 Atletas
        </button>
        <button
          className={`tab-btn ${activeTab === 'rankings' ? 'active' : ''}`}
          onClick={() => setActiveTab('rankings')}
        >
          🏆 Rankings
        </button>
        <button
          className={`tab-btn ${activeTab === 'disciplines' ? 'active' : ''}`}
          onClick={() => setActiveTab('disciplines')}
        >
          🥋 Disciplinas
        </button>
      </div>

      {/* Disciplines Filter */}
      {disciplines.length > 0 && (
        <div className="discipline-filter">
          <h3>Filtrar por Disciplina:</h3>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${selectedDiscipline === null ? 'active' : ''}`}
              onClick={() => setSelectedDiscipline(null)}
            >
              🥋 Todas
            </button>
            {disciplines.map(discipline => (
              <button
                key={discipline.discipline_id}
                className={`filter-btn ${selectedDiscipline === discipline.discipline_id ? 'active' : ''}`}
                onClick={() => setSelectedDiscipline(discipline.discipline_id)}
              >
                {getDisciplineIcon(discipline)} {discipline.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Athletes Tab */}
      {activeTab === 'athletes' && (
        <div className="athletes-grid">
          {athletes.slice(0, 12).map(athlete => (
            <div key={athlete.people_id} className="athlete-card">
              <div className="athlete-header">
                <div className="athlete-avatar">
                  {athlete.gender ? getAthleteGenderIcon(athlete.gender) : '🥋'}
                </div>
                <div className="athlete-info">
                  <h3>{athlete.name || 'Nome não disponível'}</h3>
                  <p className="athlete-country">
                    {getCountryFlag(athlete.area?.country_code)} {athlete.area?.name || 'País não disponível'}
                  </p>
                </div>
              </div>

              <div className="athlete-details">
                {athlete.gender && (
                  <div className="detail-item">
                    <span className="detail-label">⚥ Gênero:</span>
                    <span className="detail-value">{athlete.gender}</span>
                  </div>
                )}

                {athlete.weight && (
                  <div className="detail-item">
                    <span className="detail-label">⚖️ Peso:</span>
                    <span className="detail-value">{getAthleteWeightClass(athlete.weight)}</span>
                  </div>
                )}

                {athlete.birth_date && (
                  <div className="detail-item">
                    <span className="detail-label">🎂 Nascimento:</span>
                    <span className="detail-value">{formatDate(athlete.birth_date)}</span>
                  </div>
                )}

                {athlete.height && (
                  <div className="detail-item">
                    <span className="detail-label">📏 Altura:</span>
                    <span className="detail-value">{athlete.height}cm</span>
                  </div>
                )}
              </div>

              <div className="athlete-actions">
                <button 
                  className="action-btn"
                  onClick={() => window.open(`https://dsg-api.com/doc/taekwondo/get_peoples/696/?people_id=${athlete.people_id}`, '_blank')}
                >
                  📊 Ver Perfil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rankings Tab */}
      {activeTab === 'rankings' && (
        <div className="rankings-grid">
          {rankings.slice(0, 20).map((ranking, index) => (
            <div key={index} className="ranking-card">
              <div className="ranking-position">
                {getRankingPosition(ranking.position)}
              </div>
              
              <div className="ranking-info">
                <h3>{ranking.people?.name || 'Atleta não disponível'}</h3>
                <p className="ranking-country">
                  {getCountryFlag(ranking.people?.area?.country_code)} {ranking.people?.area?.name || 'País não disponível'}
                </p>
              </div>

              <div className="ranking-details">
                {ranking.competition && (
                  <div className="detail-item">
                    <span className="detail-label">🏆 Competição:</span>
                    <span className="detail-value">{ranking.competition.name}</span>
                  </div>
                )}

                {ranking.discipline && (
                  <div className="detail-item">
                    <span className="detail-label">🥋 Disciplina:</span>
                    <span className="detail-value">{ranking.discipline.name}</span>
                  </div>
                )}

                {ranking.points && (
                  <div className="detail-item">
                    <span className="detail-label">📊 Pontos:</span>
                    <span className="detail-value">{ranking.points}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Disciplines Tab */}
      {activeTab === 'disciplines' && (
        <div className="disciplines-grid">
          {disciplines.map(discipline => (
            <div key={discipline.discipline_id} className="discipline-card">
              <div className="discipline-icon">
                {getDisciplineIcon(discipline)}
              </div>
              <div className="discipline-info">
                <h3>{discipline.name}</h3>
                <p className="discipline-description">
                  {discipline.description || 'Descrição não disponível'}
                </p>
              </div>
              <div className="discipline-actions">
                <button 
                  className="action-btn"
                  onClick={() => loadAthletes(discipline.discipline_id)}
                >
                  👥 Ver Atletas
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && (athletes.length > 0 || rankings.length > 0) && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Atualizando dados...</p>
        </div>
      )}
    </div>
  );
};

export default AthletesRanking;
