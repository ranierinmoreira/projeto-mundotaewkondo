import { useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="react-component">
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h3>Componente React - Mundo Taekwondo</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Contador: {count}
        </button>
        <p>
          Este é um componente React integrado ao portal HTML
        </p>
      </div>
      <p className="read-the-docs">
        Portal desenvolvido com HTML, CSS e React
      </p>
    </div>
  )
}

export default App
