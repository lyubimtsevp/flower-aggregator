import React, { useState, useEffect } from 'react';
import ShopCard from './components/ShopCard';

function App() {
  const [shops, setShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Поиск
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShops() {
      try {
        const response = await fetch('http://localhost:5000/api/shops');
        const data = await response.json();
        setShops(data);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        setLoading(false);
      }
    }

    fetchShops();
  }, []);

  const filteredShops = shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (shop.city && shop.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Цветочные магазины</h1>
      <input
        type="text"
        placeholder="Поиск по магазинам..."
        className="mb-6 p-2 border rounded-lg w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <p className="text-center text-xl">Загрузка магазинов...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.length > 0 ? (
            filteredShops.map((shop) => (
              <ShopCard key={shop._id} shop={shop} />
            ))
          ) : (
            <p className="text-center text-xl">Магазинов не найдено</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
