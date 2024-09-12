const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); // Разрешение запросов с других источников
app.use(express.json()); // Поддержка JSON данных

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/flower-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Подключение к MongoDB успешно!'))
  .catch((err) => console.log('Ошибка подключения к MongoDB:', err));

// Модель данных для магазинов цветов
const Shop = mongoose.model('Shop', new mongoose.Schema({
  name: String,
  location: String,
  rating: Number,
}), 'flowerStores'); // Подключаемся к коллекции 'flowerStores'

// Маршрут для проверки работы сервера
app.get('/', (req, res) => {
  res.send('Backend работает!');
});

// Маршрут для получения всех магазинов
app.get('/api/shops', async (req, res) => {
  try {
    console.log('Запрос получен на /api/shops');
    const shops = await Shop.find(); // Получение всех магазинов из базы данных
    console.log('Магазины найдены:', shops);
    res.json(shops); // Отправляем данные магазинов
  } catch (err) {
    console.error('Ошибка сервера:', err);
    res.status(500).send('Ошибка сервера');
  }
});

// Маршрут для добавления нового магазина
app.post('/api/shops', async (req, res) => {
  try {
    const newShop = new Shop(req.body); // Создание нового магазина из запроса
    await newShop.save(); // Сохранение магазина в базе данных
    res.json(newShop); // Возвращаем данные нового магазина
  } catch (err) {
    console.error('Ошибка при добавлении магазина:', err);
    res.status(500).send('Ошибка при добавлении магазина');
  }
});

// Настройка порта и запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
