import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // ou o caminho do seu CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* ❌ Não coloque BrowserRouter aqui, pois já está no App.jsx */}
  </React.StrictMode>
);
