// API Service para integração com DSG API - Taekwondo
const API_BASE_URL = import.meta.env.DEV ? '/api' : 'https://dsg-api.com';
const TAEKWONDO_SPORT_ID = 696;

class TaekwondoApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.sportId = TAEKWONDO_SPORT_ID;
  }

  // Método genérico para fazer requisições
  async makeRequest(endpoint, params = {}) {
    try {
      const url = new URL(`${this.baseUrl}${endpoint}`);
      
      // Adicionar parâmetros de query
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      });

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // Note: A API pode requerer autenticação
        // headers: {
        //   'Authorization': `Bearer ${API_KEY}`,
        //   'Accept': 'application/json',
        // }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na requisição da API:', error);
      throw error;
    }
  }

  // Obter todas as áreas/países onde o taekwondo é praticado
  async getAreas() {
    return this.makeRequest(`/doc/taekwondo/get_areas/${this.sportId}/`);
  }

  // Obter competições de taekwondo
  async getCompetitions(areaId = null, season = null) {
    const params = {};
    if (areaId) params.area_id = areaId;
    if (season) params.season = season;
    
    return this.makeRequest(`/doc/taekwondo/get_competitions/${this.sportId}/`, params);
  }

  // Obter atletas/participantes
  async getAthletes(competitionId = null, areaId = null) {
    const params = {};
    if (competitionId) params.competition_id = competitionId;
    if (areaId) params.area_id = areaId;
    
    return this.makeRequest(`/doc/taekwondo/get_peoples/${this.sportId}/`, params);
  }

  // Obter lutas/matches
  async getMatches(competitionId = null, date = null) {
    const params = {};
    if (competitionId) params.competition_id = competitionId;
    if (date) params.date = date;
    
    return this.makeRequest(`/doc/taekwondo/get_matches/${this.sportId}/`, params);
  }

  // Obter lutas do dia
  async getMatchesToday() {
    return this.makeRequest(`/doc/taekwondo/get_matches_day/${this.sportId}/`);
  }

  // Obter rankings
  async getRankings(competitionId = null, discipline = null) {
    const params = {};
    if (competitionId) params.competition_id = competitionId;
    if (discipline) params.discipline = discipline;
    
    return this.makeRequest(`/doc/taekwondo/get_rankings/${this.sportId}/`, params);
  }

  // Obter notícias
  async getNews(limit = 10) {
    return this.makeRequest(`/doc/taekwondo/get_news/${this.sportId}/`, { limit });
  }

  // Obter temporadas/seasons
  async getSeasons(competitionId = null) {
    const params = {};
    if (competitionId) params.competition_id = competitionId;
    
    return this.makeRequest(`/doc/taekwondo/get_seasons/${this.sportId}/`, params);
  }

  // Obter disciplinas do taekwondo (Kyorugi, Poomsae, etc.)
  async getDisciplines() {
    return this.makeRequest(`/doc/taekwondo/get_disciplines/${this.sportId}/`);
  }

  // Obter medalhas
  async getMedals(competitionId = null, season = null) {
    const params = {};
    if (competitionId) params.competition_id = competitionId;
    if (season) params.season = season;
    
    return this.makeRequest(`/doc/taekwondo/get_medals/${this.sportId}/`, params);
  }

  // Head-to-head entre dois atletas
  async getHeadToHead(athlete1Id, athlete2Id) {
    return this.makeRequest(`/doc/taekwondo/get_head2head/${this.sportId}/`, {
      people1_id: athlete1Id,
      people2_id: athlete2Id
    });
  }

  // Obter informações de uma competição específica
  async getCompetitionDetails(competitionId) {
    return this.makeRequest(`/doc/taekwondo/get_competitions/${this.sportId}/`, {
      competition_id: competitionId
    });
  }

  // Obter informações de um atleta específico
  async getAthleteDetails(athleteId) {
    return this.makeRequest(`/doc/taekwondo/get_peoples/${this.sportId}/`, {
      people_id: athleteId
    });
  }
}

// Instância singleton do serviço
const taekwondoApi = new TaekwondoApiService();

export default taekwondoApi;

// Funções utilitárias para formatação de dados
export const formatMatchResult = (match) => {
  if (!match) return 'Não disponível';
  
  const { home_score, away_score, status } = match;
  
  if (status === 'finished') {
    return `${home_score} - ${away_score}`;
  } else if (status === 'in_progress') {
    return 'Em andamento';
  } else {
    return 'Agendado';
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Data não disponível';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return dateString;
  }
};

export const getCountryFlag = (countryCode) => {
  if (!countryCode) return '🏳️';
  
  // Mapeamento de códigos de país para emojis de bandeira
  const flagMap = {
    'KOR': '🇰🇷', // Coreia do Sul
    'USA': '🇺🇸', // Estados Unidos
    'CHN': '🇨🇳', // China
    'GBR': '🇬🇧', // Reino Unido
    'FRA': '🇫🇷', // França
    'GER': '🇩🇪', // Alemanha
    'JPN': '🇯🇵', // Japão
    'BRA': '🇧🇷', // Brasil
    'ESP': '🇪🇸', // Espanha
    'ITA': '🇮🇹', // Itália
    'RUS': '🇷🇺', // Rússia
    'AUS': '🇦🇺', // Austrália
    'CAN': '🇨🇦', // Canadá
    'MEX': '🇲🇽', // México
    'ARG': '🇦🇷', // Argentina
    'TUR': '🇹🇷', // Turquia
    'IRN': '🇮🇷', // Irã
    'THA': '🇹🇭', // Tailândia
    'VIE': '🇻🇳', // Vietnã
    'PHI': '🇵🇭', // Filipinas
    'IDN': '🇮🇩', // Indonésia
    'MAS': '🇲🇾', // Malásia
    'SGP': '🇸🇬', // Singapura
  };
  
  return flagMap[countryCode] || '🏳️';
};
