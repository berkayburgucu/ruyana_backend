const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/base64', async (req, res) => {
  const imageUrl = req.body.imageUrl;

  if (!imageUrl) {
    return res.status(400).json({ error: 'Image URL missing' });
  }

  try {
    const roboflowApiKey = process.env.ROBOFLOW_API_KEY;
    const modelId = 'palm-line-detection-9zzh0'; // kendi modelin
    const url = `https://detect.roboflow.com/${modelId}?api_key=${roboflowApiKey}`;

    const roboflowResponse = await axios.post(url, {
      image: imageUrl
    });

    // Başarı cevabı
    res.json({
      message: 'Prediction completed',
      data: roboflowResponse.data
    });

  } catch (err) {
    console.error('Roboflow API error:', err.response?.data || err.message);
    res.status(500).json({
      error: 'Roboflow API failed',
      details: err.response?.data || err.message
    });
  }
});

app.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor.');
});