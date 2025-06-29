const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/base64', (req, res) => {
  const { base64Image } = req.body;

  if (!base64Image) {
    return res.status(400).json({ error: 'Image missing' });
  }

  // Bu örnekte sadece gelen veriyi geri döner
  return res.json({ message: 'Image received', length: base64Image.length });
});

app.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor.');
});