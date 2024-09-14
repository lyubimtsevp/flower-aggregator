const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Создание приложения Express
const app = express();
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/flower-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Определение схемы и модели для магазинов
const shopSchema = new mongoose.Schema({
  name: String,
  city: String,
  address: String,
  rating: Number,
});

const Shop = mongoose.model('Shop', shopSchema);

// Маршрут для корневого запроса (обработка GET /)
app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

// Получение списка магазинов (GET /api/shops)
app.get('/api/shops', async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении магазинов' });
  }
});

// Создание нового магазина (POST /api/shops)
app.post('/api/shops', async (req, res) => {
  const { name, city, address, rating } = req.body;
  const newShop = new Shop({ name, city, address, rating });
  try {
    await newShop.save();
    res.status(201).json(newShop);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании магазина' });
  }
});

// Удаление магазина (DELETE /api/shops/:id)
app.delete('/api/shops/:id', async (req, res) => {
  try {
    await Shop.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Магазин удалён' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении магазина' });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
