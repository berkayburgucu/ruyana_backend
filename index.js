const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/predict', async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: 'Image URL is missing' });
  }

  const roboflowApiKey = process.env.ROBOFLOW_API_KEY;
  const modelId = 'palm-line-detection-9zzh0'; // Roboflow model ID
  const roboflowUrl = `https://detect.roboflow.com/${modelId}?api_key=${roboflowApiKey}`;

  try {
    const response = await axios.post(roboflowUrl, {
      image: imageUrl,
    });

    res.json({
      message: 'Prediction successful',
      prediction: response.data,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Roboflow API failed',
      details: err.response?.data || err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});