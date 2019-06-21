import React from 'react';
import '../assets/css/App.css';
import Home from '../pages/HomePage'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2> Tasks </h2>
      </header>
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
