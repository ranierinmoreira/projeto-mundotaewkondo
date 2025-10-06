# 🎬 Sistema de Vídeos - Mundo Taekwondo

## Estrutura de Arquivos

### Vídeos Principais
- `taekwondo-hero.mp4` - Vídeo de fundo do hero (já existe)
- `video-placeholder.svg` - Placeholder para vídeos (já existe)

### Vídeos da Galeria (Exemplos)
Para demonstrar o sistema, você pode adicionar os seguintes vídeos:

#### Técnicas
- `tecnicas-basicas.mp4` - Técnicas básicas de chute
- `poomsae.mp4` - Formas tradicionais
- `defesas.mp4` - Técnicas de defesa

#### Competições
- `olimpiadas-2024.mp4` - Competições olímpicas
- `mundial-2023.mp4` - Campeonato mundial

#### Treinos
- `flexibilidade.mp4` - Exercícios de flexibilidade
- `aquecimento.mp4` - Rotina de aquecimento
- `resistencia.mp4` - Treino de resistência

### Thumbnails
Crie uma pasta `thumbnails/` e adicione imagens correspondentes:
- `tecnicas-basicas.jpg`
- `poomsae.jpg`
- `defesas.jpg`
- `olimpiadas-2024.jpg`
- `mundial-2023.jpg`
- `flexibilidade.jpg`
- `aquecimento.jpg`
- `resistencia.jpg`

## Como Adicionar Vídeos

### 1. Via Interface de Administração
1. Acesse a seção "Administração de Vídeos" no portal
2. Clique em "Adicionar Vídeo"
3. Preencha os dados do vídeo
4. Salve o vídeo

### 2. Via API
```javascript
import videoApi from './src/api/videoApi';

const novoVideo = {
  title: "Meu Vídeo",
  description: "Descrição do vídeo",
  category: "tecnicas",
  videoUrl: "/videos/meu-video.mp4",
  thumbnail: "/videos/thumbnails/meu-video.jpg",
  duration: "5:30",
  instructor: "Mestre Silva",
  difficulty: "iniciante",
  tags: ["chutes", "básico"]
};

await videoApi.addVideo(novoVideo);
```

## Formatos Suportados

### Vídeos
- **MP4** (recomendado)
- **WebM** (para melhor compatibilidade)
- **OGV** (fallback)

### Thumbnails
- **JPG** (recomendado)
- **PNG** (para transparência)
- **WebP** (otimizado)

## Especificações Técnicas

### Vídeos
- **Resolução**: 1920x1080 (Full HD) ou superior
- **Duração**: 5-15 minutos (ideal)
- **Tamanho**: máximo 50MB por vídeo
- **Codec**: H.264 para MP4

### Thumbnails
- **Resolução**: 1280x720 (16:9)
- **Tamanho**: máximo 500KB
- **Formato**: JPG com qualidade 85%

## Funcionalidades do Sistema

### ✅ Implementadas
- ✅ Galeria de vídeos interativa
- ✅ Player de vídeo customizado
- ✅ Sistema de categorias
- ✅ Busca de vídeos
- ✅ Estatísticas (visualizações, curtidas)
- ✅ Interface de administração
- ✅ API para gerenciamento
- ✅ Design responsivo

### 🔄 Em Desenvolvimento
- 🔄 Upload de vídeos
- 🔄 Sistema de comentários
- 🔄 Playlists personalizadas
- 🔄 Recomendações baseadas em histórico

## Estrutura da API

### Endpoints Disponíveis
```javascript
// Buscar todos os vídeos
await videoApi.getAllVideos()

// Buscar por categoria
await videoApi.getVideosByCategory('tecnicas')

// Buscar por termo
await videoApi.searchVideos('chutes')

// Adicionar vídeo
await videoApi.addVideo(videoData)

// Atualizar vídeo
await videoApi.updateVideo(id, updateData)

// Deletar vídeo
await videoApi.deleteVideo(id)

// Incrementar visualizações
await videoApi.incrementViews(id)

// Curtir vídeo
await videoApi.toggleLike(id)

// Estatísticas
await videoApi.getStats()
```

## Personalização

### Cores do Tema
As cores podem ser personalizadas no arquivo `src/config/site.js`:
```javascript
colors: {
  primary: '#ffd700',    // Dourado
  secondary: '#1e3c72',  // Azul escuro
  background: '#0a192f', // Fundo escuro
  text: '#ffffff',       // Texto branco
  textSecondary: '#e0e0e0' // Texto secundário
}
```

### Categorias
Para adicionar novas categorias, edite:
- `src/components/VideoGallery.jsx` (array categories)
- `src/components/VideoAdmin.jsx` (array categories)
- `src/api/videoApi.js` (dados de exemplo)

## Performance

### Otimizações Implementadas
- Lazy loading de vídeos
- Compressão de thumbnails
- Cache de dados da API
- Design responsivo
- Carregamento assíncrono

### Recomendações
- Use CDN para hospedar vídeos
- Implemente cache no servidor
- Otimize vídeos com ferramentas como HandBrake
- Use WebP para thumbnails quando possível

---

**Nota**: Este sistema foi desenvolvido para demonstrar as funcionalidades. Em produção, considere implementar autenticação, validação de uploads e integração com serviços de vídeo como YouTube ou Vimeo.