import React from 'react';
import './App.css';
import Search from './components/Search';  // Импорт компонента поиска

function App() {
  return (
    <div className="App">
      <Search />  {/* Компонент поиска магазинов */}
    </div>
  );
}

export default App;