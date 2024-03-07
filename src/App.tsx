import React from 'react';
import SignUpForm from './components/signUpForm'; // Importa tu componente SignUpForm
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Elimina el contenido del encabezado si no lo necesitas */}
        <SignUpForm /> {/* Renderiza tu componente SignUpForm aquí */}
      </header>
    </div>
  );
}

export default App;
