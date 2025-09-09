import { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useState(0)

  return (
    <HelmetProvider>
      <Helmet>
        <title>Mundo Taekwondo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Adicione outros elementos do head aqui */}
      </Helmet>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Mundo Taekwondo</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Clique nos logos para saber mais sobre Vite e React
      </p>
    </HelmetProvider>
  )
}

export default App
