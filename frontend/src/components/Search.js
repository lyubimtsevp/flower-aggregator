import React, { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    // Запрос на бэкенд
    const response = await fetch('http://localhost:5000/api/shops');
    const data = await response.json();

    // Фильтрация данных по запросу
    const filteredResults = data.filter(shop =>
      shop.location.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filteredResults);
  };

  return (
    <div>
      <h2>Поиск цветочных магазинов</h2>
      <input
        type="text"
        placeholder="Введите город или название магазина"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Найти</button>

      <h3>Результаты поиска:</h3>
      <ul>
        {results.length > 0 ? (
          results.map((shop) => (
            <li key={shop.id}>
              {shop.name} - {shop.location}
            </li>
          ))
        ) : (
          <li>Результатов нет</li>
        )}
      </ul>
    </div>
  );
};

export default Search;
