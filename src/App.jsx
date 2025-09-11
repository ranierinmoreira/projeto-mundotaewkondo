import { useState } from 'react';
import InteractiveSection from './components/InteractiveSection';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="react-component">
        <h3>🥋 Portal Interativo - Mundo Taekwondo</h3>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Cliques de Interesse: {count}
          </button>
          <p>
            Este portal combina HTML tradicional com componentes React modernos para uma experiência completa sobre Taekwondo.
          </p>
          <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
            <p>✨ Tecnologias utilizadas:</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>🎨 HTML5 + CSS3 para estrutura e design</li>
              <li>⚛️ React para interatividade</li>
              <li>🎬 Vídeo de fundo responsivo</li>
              <li>📱 Design totalmente responsivo</li>
            </ul>
          </div>
        </div>
      </div>
      
      <InteractiveSection />
    </>
  )
}

export default App
