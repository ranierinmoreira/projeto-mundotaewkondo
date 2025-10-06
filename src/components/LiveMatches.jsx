import { useEffect, useState } from 'react';
import taekwondoApi, { formatDate, getCountryFlag } from '../api/taekwondoApi';
import './LiveMatches.css';

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [todayMatches, setTodayMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('today');
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      // Carregar competições
      const competitionsData = await taekwondoApi.getCompetitions();
      if (competitionsData && competitionsData.data) {
        setCompetitions(competitionsData.data);
      }

      // Carregar lutas do dia
      await loadTodayMatches();
      
      // Carregar lutas gerais
      await loadMatches();
      
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dados das lutas. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  const loadTodayMatches = async () => {
    try {
      const data = await taekwondoApi.getMatchesToday();
      if (data && data.data) {
        setTodayMatches(data.data);
      }
    } catch (err) {
      console.error('Erro ao carregar lutas de hoje:', err);
    }
  };

  const loadMatches = async (competitionId = null) => {
    try {
      const data = await taekwondoApi.getMatches(competitionId);
      if (data && data.data) {
        setMatches(data.data);
      }
      setSelectedCompetition(competitionId);
    } catch (err) {
      console.error('Erro ao carregar lutas:', err);
    }
  };

  const getMatchStatus = (status) => {
    switch (status) {
      case 'finished':
        return { text: 'Finalizado', class: 'status-finished', icon: '✅' };
      case 'in_progress':
        return { text: 'Em Andamento', class: 'status-live', icon: '🔴' };
      case 'scheduled':
        return { text: 'Agendado', class: 'status-scheduled', icon: '⏰' };
      case 'cancelled':
        return { text: 'Cancelado', class: 'status-cancelled', icon: '❌' };
      default:
        return { text: 'Desconhecido', class: 'status-unknown', icon: '❓' };
    }
  };

  const getWeightClassIcon = (weight) => {
    if (!weight) return '⚖️';
    
    const weightNum = parseFloat(weight);
    
    if (weightNum <= 49) return '🪶'; // Mosca
    if (weightNum <= 53) return '🐦'; // Galo
    if (weightNum <= 57) return '🦅'; // Pena
    if (weightNum <= 62) return '⚡'; // Leve
    if (weightNum <= 67) return '💪'; // Meio-médio
    if (weightNum <= 72) return '🏋️'; // Médio
    if (weightNum <= 78) return '🦍'; // Meio-pesado
    if (weightNum <= 85) return '🐘'; // Pesado
    return '🦣'; // Super pesado
  };

  const getMatchType = (matchType) => {
    switch (matchType?.toLowerCase()) {
      case 'final':
        return { icon: '🥇', text: 'Final' };
      case 'semi_final':
        return { icon: '🥈', text: 'Semi-final' };
      case 'quarter_final':
        return { icon: '🥉', text: 'Quartas' };
      case 'round_of_16':
        return { icon: '🏅', text: 'Oitavas' };
      case 'round_of_32':
        return { icon: '🎖️', text: '16ª de final' };
      default:
        return { icon: '🥋', text: matchType || 'Luta' };
    }
  };

  const getGenderIcon = (gender) => {
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

  if (loading && matches.length === 0 && todayMatches.length === 0) {
    return (
      <div className="live-matches">
        <div className="matches-header">
          <h2>🥊 Lutas ao Vivo</h2>
          <p>Resultados e programação de lutas de taekwondo em tempo real</p>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando dados das lutas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="live-matches">
        <div className="matches-header">
          <h2>🥊 Lutas ao Vivo</h2>
          <p>Resultados e programação de lutas de taekwondo em tempo real</p>
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
    <div className="live-matches">
      <div className="matches-header">
        <h2>🥊 Lutas ao Vivo</h2>
        <p>Resultados e programação de lutas de taekwondo em tempo real</p>
      </div>

      {/* Tabs */}
      <div className="matches-tabs">
        <button
          className={`tab-btn ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => setActiveTab('today')}
        >
          📅 Hoje
        </button>
        <button
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          🥋 Todas
        </button>
        <button
          className={`tab-btn ${activeTab === 'live' ? 'active' : ''}`}
          onClick={() => setActiveTab('live')}
        >
          🔴 Ao Vivo
        </button>
      </div>

      {/* Competition Filter */}
      {competitions.length > 0 && activeTab !== 'today' && (
        <div className="competition-filter">
          <h3>Filtrar por Competição:</h3>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${selectedCompetition === null ? 'active' : ''}`}
              onClick={() => loadMatches(null)}
            >
              🏆 Todas
            </button>
            {competitions.slice(0, 8).map(competition => (
              <button
                key={competition.competition_id}
                className={`filter-btn ${selectedCompetition === competition.competition_id ? 'active' : ''}`}
                onClick={() => loadMatches(competition.competition_id)}
              >
                🏆 {competition.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Today Matches Tab */}
      {activeTab === 'today' && (
        <div className="matches-grid">
          {todayMatches.length > 0 ? todayMatches.map(match => (
            <div key={match.match_id} className="match-card">
              <div className="match-header">
                <div className="match-status">
                  {getMatchStatus(match.status)}
                </div>
                <div className="match-type">
                  {getMatchType(match.match_type)}
                </div>
              </div>

              <div className="match-fighters">
                <div className="fighter fighter-home">
                  <div className="fighter-flag">
                    {getCountryFlag(match.home_team?.area?.country_code)}
                  </div>
                  <div className="fighter-info">
                    <h3>{match.home_team?.name || 'Atleta 1'}</h3>
                    <p className="fighter-country">
                      {match.home_team?.area?.name || 'País não disponível'}
                    </p>
                  </div>
                  <div className="fighter-score">
                    {match.home_score || '-'}
                  </div>
                </div>

                <div className="vs-divider">
                  <span className="vs-text">VS</span>
                  <div className="match-details">
                    {match.weight && (
                      <div className="detail">
                        {getWeightClassIcon(match.weight)} {match.weight}kg
                      </div>
                    )}
                    {match.gender && (
                      <div className="detail">
                        {getGenderIcon(match.gender)} {match.gender}
                      </div>
                    )}
                  </div>
                </div>

                <div className="fighter fighter-away">
                  <div className="fighter-score">
                    {match.away_score || '-'}
                  </div>
                  <div className="fighter-info">
                    <h3>{match.away_team?.name || 'Atleta 2'}</h3>
                    <p className="fighter-country">
                      {match.away_team?.area?.name || 'País não disponível'}
                    </p>
                  </div>
                  <div className="fighter-flag">
                    {getCountryFlag(match.away_team?.area?.country_code)}
                  </div>
                </div>
              </div>

              <div className="match-info">
                {match.competition && (
                  <div className="info-item">
                    <span className="info-label">🏆 Competição:</span>
                    <span className="info-value">{match.competition.name}</span>
                  </div>
                )}
                
                {match.start_date && (
                  <div className="info-item">
                    <span className="info-label">⏰ Horário:</span>
                    <span className="info-value">{formatDate(match.start_date)}</span>
                  </div>
                )}

                {match.venue && (
                  <div className="info-item">
                    <span className="info-label">📍 Local:</span>
                    <span className="info-value">{match.venue.name}</span>
                  </div>
                )}
              </div>
            </div>
          )) : (
            <div className="no-matches">
              <div className="no-data-icon">🥋</div>
              <h3>Nenhuma luta agendada para hoje</h3>
              <p>Verifique outras datas ou competições.</p>
            </div>
          )}
        </div>
      )}

      {/* All Matches Tab */}
      {activeTab === 'all' && (
        <div className="matches-grid">
          {matches.length > 0 ? matches.map(match => (
            <div key={match.match_id} className="match-card">
              <div className="match-header">
                <div className="match-status">
                  {getMatchStatus(match.status)}
                </div>
                <div className="match-type">
                  {getMatchType(match.match_type)}
                </div>
              </div>

              <div className="match-fighters">
                <div className="fighter fighter-home">
                  <div className="fighter-flag">
                    {getCountryFlag(match.home_team?.area?.country_code)}
                  </div>
                  <div className="fighter-info">
                    <h3>{match.home_team?.name || 'Atleta 1'}</h3>
                    <p className="fighter-country">
                      {match.home_team?.area?.name || 'País não disponível'}
                    </p>
                  </div>
                  <div className="fighter-score">
                    {match.home_score || '-'}
                  </div>
                </div>

                <div className="vs-divider">
                  <span className="vs-text">VS</span>
                  <div className="match-details">
                    {match.weight && (
                      <div className="detail">
                        {getWeightClassIcon(match.weight)} {match.weight}kg
                      </div>
                    )}
                    {match.gender && (
                      <div className="detail">
                        {getGenderIcon(match.gender)} {match.gender}
                      </div>
                    )}
                  </div>
                </div>

                <div className="fighter fighter-away">
                  <div className="fighter-score">
                    {match.away_score || '-'}
                  </div>
                  <div className="fighter-info">
                    <h3>{match.away_team?.name || 'Atleta 2'}</h3>
                    <p className="fighter-country">
                      {match.away_team?.area?.name || 'País não disponível'}
                    </p>
                  </div>
                  <div className="fighter-flag">
                    {getCountryFlag(match.away_team?.area?.country_code)}
                  </div>
                </div>
              </div>

              <div className="match-info">
                {match.competition && (
                  <div className="info-item">
                    <span className="info-label">🏆 Competição:</span>
                    <span className="info-value">{match.competition.name}</span>
                  </div>
                )}
                
                {match.start_date && (
                  <div className="info-item">
                    <span className="info-label">⏰ Horário:</span>
                    <span className="info-value">{formatDate(match.start_date)}</span>
                  </div>
                )}

                {match.venue && (
                  <div className="info-item">
                    <span className="info-label">📍 Local:</span>
                    <span className="info-value">{match.venue.name}</span>
                  </div>
                )}
              </div>
            </div>
          )) : (
            <div className="no-matches">
              <div className="no-data-icon">🥋</div>
              <h3>Nenhuma luta encontrada</h3>
              <p>Tente selecionar uma competição diferente.</p>
            </div>
          )}
        </div>
      )}

      {/* Live Matches Tab */}
      {activeTab === 'live' && (
        <div className="matches-grid">
          {matches.filter(match => match.status === 'in_progress').length > 0 ? 
            matches.filter(match => match.status === 'in_progress').map(match => (
              <div key={match.match_id} className="match-card live-match">
                <div className="match-header">
                  <div className="match-status">
                    <span className="status-icon">🔴</span>
                    <span className="status-text">AO VIVO</span>
                  </div>
                  <div className="match-type">
                    {getMatchType(match.match_type)}
                  </div>
                </div>

                <div className="match-fighters">
                  <div className="fighter fighter-home">
                    <div className="fighter-flag">
                      {getCountryFlag(match.home_team?.area?.country_code)}
                    </div>
                    <div className="fighter-info">
                      <h3>{match.home_team?.name || 'Atleta 1'}</h3>
                      <p className="fighter-country">
                        {match.home_team?.area?.name || 'País não disponível'}
                      </p>
                    </div>
                    <div className="fighter-score live-score">
                      {match.home_score || '-'}
                    </div>
                  </div>

                  <div className="vs-divider">
                    <span className="vs-text live-vs">VS</span>
                    <div className="match-details">
                      {match.weight && (
                        <div className="detail">
                          {getWeightClassIcon(match.weight)} {match.weight}kg
                        </div>
                      )}
                      {match.gender && (
                        <div className="detail">
                          {getGenderIcon(match.gender)} {match.gender}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="fighter fighter-away">
                    <div className="fighter-score live-score">
                      {match.away_score || '-'}
                    </div>
                    <div className="fighter-info">
                      <h3>{match.away_team?.name || 'Atleta 2'}</h3>
                      <p className="fighter-country">
                        {match.away_team?.area?.name || 'País não disponível'}
                      </p>
                    </div>
                    <div className="fighter-flag">
                      {getCountryFlag(match.away_team?.area?.country_code)}
                    </div>
                  </div>
                </div>

                <div className="match-info">
                  {match.competition && (
                    <div className="info-item">
                      <span className="info-label">🏆 Competição:</span>
                      <span className="info-value">{match.competition.name}</span>
                    </div>
                  )}
                </div>
              </div>
            )) : (
              <div className="no-matches">
                <div className="no-data-icon">🔴</div>
                <h3>Nenhuma luta ao vivo no momento</h3>
                <p>Volte mais tarde para acompanhar as lutas em tempo real.</p>
              </div>
            )
          }
        </div>
      )}

      {loading && (matches.length > 0 || todayMatches.length > 0) && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Atualizando dados...</p>
        </div>
      )}
    </div>
  );
};

export default LiveMatches;
