# 🥋 API Integration - Taekwondo Data

## 📋 Visão Geral

Este projeto integra com a [API DSG (Data Sports Group)](https://dsg-api.com/doc/taekwondo/get_areas/696/) para fornecer dados reais e atualizados sobre taekwondo, incluindo competições, atletas, lutas e rankings mundiais.

## 🔗 Endpoints Utilizados

### 1. **Áreas/Países** (`get_areas`)
- **URL**: `/doc/taekwondo/get_areas/696/`
- **Descrição**: Lista todos os países e regiões onde o taekwondo é praticado
- **Uso**: Filtros por região nas competições

### 2. **Competições** (`get_competitions`)
- **URL**: `/doc/taekwondo/get_competitions/696/`
- **Parâmetros**: `area_id`, `season`
- **Descrição**: Lista competições de taekwondo (Olímpicos, Mundiais, etc.)
- **Uso**: Exibição de competições ativas e futuras

### 3. **Atletas** (`get_peoples`)
- **URL**: `/doc/taekwondo/get_peoples/696/`
- **Parâmetros**: `competition_id`, `area_id`
- **Descrição**: Informações sobre atletas profissionais
- **Uso**: Perfis de atletas e rankings

### 4. **Lutas** (`get_matches`)
- **URL**: `/doc/taekwondo/get_matches/696/`
- **Parâmetros**: `competition_id`, `date`
- **Descrição**: Resultados e programação de lutas
- **Uso**: Lutas ao vivo e resultados históricos

### 5. **Lutas do Dia** (`get_matches_day`)
- **URL**: `/doc/taekwondo/get_matches_day/696/`
- **Descrição**: Lutas agendadas para hoje
- **Uso**: Lutas do dia atual

### 6. **Rankings** (`get_rankings`)
- **URL**: `/doc/taekwondo/get_rankings/696/`
- **Parâmetros**: `competition_id`, `discipline`
- **Descrição**: Classificações mundiais
- **Uso**: Rankings por disciplina e competição

### 7. **Disciplinas** (`get_disciplines`)
- **URL**: `/doc/taekwondo/get_disciplines/696/`
- **Descrição**: Modalidades do taekwondo (Kyorugi, Poomsae, etc.)
- **Uso**: Filtros por tipo de competição

### 8. **Notícias** (`get_news`)
- **URL**: `/doc/taekwondo/get_news/696/`
- **Parâmetros**: `limit`
- **Descrição**: Últimas notícias do taekwondo
- **Uso**: Seção de notícias (implementação futura)

### 9. **Medalhas** (`get_medals`)
- **URL**: `/doc/taekwondo/get_medals/696/`
- **Parâmetros**: `competition_id`, `season`
- **Descrição**: Quadro de medalhas
- **Uso**: Estatísticas de medalhas (implementação futura)

### 10. **Head-to-Head** (`get_head2head`)
- **URL**: `/doc/taekwondo/get_head2head/696/`
- **Parâmetros**: `people1_id`, `people2_id`
- **Descrição**: Confrontos diretos entre atletas
- **Uso**: Comparações entre atletas (implementação futura)

## 🛠️ Como Usar

### Importar o Serviço
```javascript
import taekwondoApi from './api/taekwondoApi';
```

### Exemplos de Uso

#### Buscar Competições
```javascript
// Todas as competições
const competitions = await taekwondoApi.getCompetitions();

// Competições de uma região específica
const competitions = await taekwondoApi.getCompetitions(123); // area_id
```

#### Buscar Atletas
```javascript
// Todos os atletas
const athletes = await taekwondoApi.getAthletes();

// Atletas de uma competição específica
const athletes = await taekwondoApi.getAthletes(456); // competition_id
```

#### Buscar Lutas
```javascript
// Todas as lutas
const matches = await taekwondoApi.getMatches();

// Lutas de hoje
const todayMatches = await taekwondoApi.getMatchesToday();

// Lutas de uma competição específica
const matches = await taekwondoApi.getMatches(789); // competition_id
```

#### Buscar Rankings
```javascript
// Todos os rankings
const rankings = await taekwondoApi.getRankings();

// Rankings de uma disciplina específica
const rankings = await taekwondoApi.getRankings(null, 'kyorugi');
```

## 🎯 Componentes Implementados

### 1. **LiveCompetitions**
- Exibe competições ativas e futuras
- Filtros por região
- Status das competições (ativo, finalizado, agendado)
- Links para detalhes e lutas

### 2. **AthletesRanking**
- Perfis de atletas profissionais
- Rankings mundiais
- Filtros por disciplina
- Informações detalhadas dos atletas

### 3. **LiveMatches**
- Lutas do dia
- Lutas ao vivo
- Resultados históricos
- Filtros por competição

## 🔧 Funções Utilitárias

### `formatMatchResult(match)`
Formata o resultado de uma luta para exibição.

### `formatDate(dateString)`
Formata datas para o padrão brasileiro.

### `getCountryFlag(countryCode)`
Retorna emoji da bandeira do país baseado no código.

## ⚠️ Considerações Importantes

### **Limitações da API**
1. **Rate Limiting**: A API pode ter limites de requisições
2. **Autenticação**: Pode ser necessária chave de API para uso completo
3. **Dados**: Alguns endpoints podem retornar dados limitados sem autenticação

### **Tratamento de Erros**
- Todos os métodos incluem tratamento de erro
- Fallbacks para quando a API não está disponível
- Mensagens de erro amigáveis para o usuário

### **Performance**
- Carregamento assíncrono dos dados
- Estados de loading e erro
- Cache local pode ser implementado futuramente

## 🚀 Funcionalidades Futuras

### **Implementações Planejadas**
1. **Notícias**: Seção de notícias atualizadas
2. **Medalhas**: Quadro de medalhas por competição
3. **Head-to-Head**: Comparações entre atletas
4. **Favoritos**: Sistema de atletas/competições favoritas
5. **Notificações**: Alertas para lutas ao vivo
6. **Cache**: Sistema de cache para melhor performance
7. **Autenticação**: Integração com chave de API

### **Melhorias Técnicas**
1. **PWA**: Transformar em Progressive Web App
2. **Offline**: Funcionalidade offline com cache
3. **Real-time**: WebSockets para atualizações em tempo real
4. **Analytics**: Métricas de uso da API

## 📊 Estrutura de Dados

### **Competição**
```javascript
{
  competition_id: 123,
  name: "World Taekwondo Championships",
  status: "active",
  start_date: "2024-01-15",
  end_date: "2024-01-20",
  area: {
    area_id: 123,
    name: "South Korea",
    country_code: "KOR"
  }
}
```

### **Atleta**
```javascript
{
  people_id: 456,
  name: "John Doe",
  gender: "male",
  weight: "68",
  height: "175",
  birth_date: "1995-03-15",
  area: {
    area_id: 456,
    name: "United States",
    country_code: "USA"
  }
}
```

### **Luta**
```javascript
{
  match_id: 789,
  status: "finished",
  start_date: "2024-01-15T14:30:00Z",
  home_team: {
    name: "John Doe",
    area: { name: "USA", country_code: "USA" }
  },
  away_team: {
    name: "Jane Smith",
    area: { name: "South Korea", country_code: "KOR" }
  },
  home_score: 15,
  away_score: 12,
  competition: {
    name: "World Championships"
  }
}
```

## 🔗 Links Úteis

- [Documentação da API DSG](https://dsg-api.com/doc/taekwondo/get_areas/696/)
- [World Taekwondo Federation](https://www.worldtaekwondo.org/)
- [Taekwondo nas Olimpíadas](https://olympics.com/en/sports/taekwondo/)

---

**💡 Dica**: Para melhor experiência, implemente cache local e considere usar uma chave de API para acesso completo aos dados.
