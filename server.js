const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 7301;

const TELEGRAM_BOT_TOKEN = '8121854251:AAH2q0AXn6p_RD_vsub28XLYyOTEwtCa9Ko';
const TELEGRAM_CHANNEL_ID = '-4985610214';
const corsOptions = {
  origin: 'http://za-mkadnaya-svadba.ru',  // или просто '*', если хочешь разрешить всем
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // если используешь куки
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
  const { name, contact, comment } = req.body;

  const text = `📩 Новая заявка на свадьбу:\n👤 Имя: ${name}\n📞 Контакт: ${contact}\n💬 Комментарий: ${comment || '—'}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHANNEL_ID, text })
    });

    if (!response.ok) {
      throw new Error('Ошибка Telegram API');
    }

    res.status(200).json({ message: 'Успешно отправлено!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка отправки сообщения' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});

