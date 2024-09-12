import React from 'react';

const ShopCard = ({ shop }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold mb-2">{shop.name}</h2>
    <p className="text-lg text-gray-700">Город: {shop.city || 'Не указан'}</p>
    <p className="text-lg text-gray-700">Адрес: {shop.address || 'Не указан'}</p>
    <p className="text-lg text-gray-700">Рейтинг: {shop.rating || 'Не указан'}</p>
  </div>
);

export default ShopCard;
