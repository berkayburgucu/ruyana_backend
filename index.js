const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/base64', async (req, res) => {
  const imageUrl = req.body.imageUrl;

  if (!imageUrl) {
    return res.status(400).json({ error: 'Image URL missing' });
  }

  try {
    const roboflowApiKey = process.env.ROBOFLOW_API_KEY;
    const modelId = "palm-line-detection-9zzh0"; // senin model ID

    const url = `https://detect.roboflow.com/${modelId}?api_key=${roboflowApiKey}&image=${encodeURIComponent(imageUrl)}`;

    const roboFlowResponse = await axios.get(url);

    res.json({
      message: "Prediction completed",
      result: roboFlowResponse.data
    });

  } catch (err) {
    console.error("Roboflow API error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Roboflow API failed",
      details: err.response?.data || err.message
    });
  }
});

app.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor.');
});