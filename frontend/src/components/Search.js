import React, { useState, useEffect } from 'react';

function Search() {
  const [shops, setShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/shops');
        const data = await response.json();
        setShops(data);
        setFilteredShops(data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchShops();
  }, []);

  useEffect(() => {
    let filtered = shops.filter((shop) => 
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (shop.city && shop.city.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (sortOption === 'rating') {
      filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredShops(filtered);
  }, [searchTerm, sortOption, shops]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Введите город или название"
        value={searchTerm}
        onChange={handleSearch}
      />
      <select value={sortOption} onChange={handleSortChange}>
        <option value="default">Сортировать по умолчанию</option>
        <option value="rating">Сортировать по рейтингу</option>
      </select>
      <ul>
        {filteredShops.map((shop) => (
          <li key={shop._id}>
            {shop.name} - {shop.city || 'Не указан город'}
            <p>{shop.rating ? `Рейтинг: ${shop.rating}` : 'Рейтинг не указан'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
