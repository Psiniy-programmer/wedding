
// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; // если используешь Node 18+, можно убрать

const app = express();
const PORT = 3000;

const TELEGRAM_BOT_TOKEN = '8121854251:AAH2q0AXn6p_RD_vsub28XLYyOTEwtCa9Ko';
const TELEGRAM_CHANNEL_ID = '-4985610214';

app.use(cors());
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

