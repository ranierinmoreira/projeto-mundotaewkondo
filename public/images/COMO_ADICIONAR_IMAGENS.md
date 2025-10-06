# 🖼️ Como Adicionar Imagens de Lutas de Taekwondo

## 📁 Estrutura de Pastas Recomendada

Crie as seguintes pastas dentro de `/public/images/`:

```
public/images/
├── lutas/
│   ├── chute-frontal-ap-chagi.jpg
│   ├── chute-lateral-yeop-chagi.jpg
│   ├── dollyo-chagi-circular.jpg
│   └── bandae-dollyo-chagi.jpg
├── competicoes/
│   ├── olimpiadas-2024.jpg
│   ├── campeonato-mundial.jpg
│   └── copa-do-mundo.jpg
├── treinos/
│   ├── treino-flexibilidade.jpg
│   ├── treino-grupo.jpg
│   └── preparacao-fisica.jpg
└── tecnicas/
    ├── posicoes-combate.jpg
    ├── defesas-makgi.jpg
    └── sequencias-ataque.jpg
```

## 🎯 Tipos de Imagens Sugeridas

### 1. **Técnicas de Chute (Chagi)**
- Ap Chagi (chute frontal)
- Yeop Chagi (chute lateral)
- Dollyo Chagi (chute circular)
- Bandae Dollyo Chagi (chute circular reverso)
- Neryo Chagi (chute descendente)
- Twio Ap Chagi (chute frontal saltado)

### 2. **Competições**
- Jogos Olímpicos
- Campeonatos Mundiais
- Copa do Mundo
- Competições regionais
- Demonstrações de faixas pretas

### 3. **Treinos**
- Exercícios de flexibilidade
- Treinos em grupo
- Preparação física
- Alongamentos
- Exercícios de coordenação

### 4. **Posições e Defesas**
- Posições de combate (Sogi)
- Defesas (Makgi)
- Sequências de ataque
- Formas (Poomsae)

## 📐 Especificações Técnicas

### **Formato e Tamanho**
- **Formatos**: JPG, PNG, WebP
- **Tamanho recomendado**: 800x600px (proporção 4:3)
- **Tamanho do arquivo**: Máximo 500KB por imagem
- **Qualidade**: Alta resolução, boa iluminação

### **Otimização**
- Comprima as imagens antes de adicionar
- Use ferramentas como TinyPNG ou ImageOptim
- Mantenha boa qualidade visual

## 🔧 Como Atualizar o Componente

Após adicionar as imagens, edite o arquivo `src/components/ImageGallery.jsx`:

1. **Localize o array `taekwondoImages`**
2. **Adicione novos objetos de imagem**:

```javascript
{
  id: 9, // Próximo ID disponível
  src: '/images/lutas/sua-imagem.jpg',
  alt: 'Descrição da imagem',
  title: 'Título da Imagem',
  description: 'Descrição detalhada da técnica ou momento capturado.',
  category: 'tecnicas', // ou 'competicoes', 'treinos'
  tags: ['chute', 'frontal', 'técnica']
}
```

## 🏷️ Sistema de Categorias

### **Categorias Disponíveis:**
- `tecnicas` - Técnicas e movimentos
- `competicoes` - Competições e eventos
- `treinos` - Treinos e preparação

### **Tags Sugeridas:**
- **Técnicas**: chute, frontal, lateral, circular, defesa, ataque
- **Competições**: olimpiadas, mundial, competição, medalha
- **Treinos**: flexibilidade, grupo, preparação, alongamento

## 📱 Responsividade

As imagens serão automaticamente:
- Redimensionadas para diferentes telas
- Otimizadas para dispositivos móveis
- Carregadas com lazy loading

## 🎨 Dicas de Captura

### **Para Técnicas:**
- Capture o momento exato da execução
- Use boa iluminação
- Foque no movimento e posição
- Inclua o contexto do dojô

### **Para Competições:**
- Capture momentos de ação
- Inclua o ambiente competitivo
- Mostre a intensidade dos atletas
- Capture vitórias e derrotas

### **Para Treinos:**
- Mostre a disciplina e foco
- Capture a interação entre praticantes
- Inclua o ambiente de treino
- Mostre progresso e dedicação

## ⚠️ Importante

1. **Direitos autorais**: Use apenas imagens que você possui ou tem permissão para usar
2. **Qualidade**: Mantenha alta qualidade visual
3. **Organização**: Mantenha os arquivos bem organizados
4. **Nomenclatura**: Use nomes descritivos em português

## 🚀 Resultado Final

Após adicionar as imagens, você terá:
- Uma galeria interativa e responsiva
- Filtros por categoria
- Modal para visualização ampliada
- Design moderno e atrativo
- Integração perfeita com o site

---

**💡 Dica**: Comece com algumas imagens de exemplo e vá expandindo gradualmente a galeria conforme tiver mais conteúdo disponível.
