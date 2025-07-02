const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 3000;
const ROBOFLOW_MODEL = process.env.ROBOFLOW_MODEL;
const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY;

app.post('/predict', async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: 'imageUrl is required' });
  }

  try {
    const roboflowUrl = `https://detect.roboflow.com/${ROBOFLOW_MODEL}?api_key=${ROBOFLOW_API_KEY}`;
    const roboflowResponse = await axios.post(
      roboflowUrl,
      imageUrl,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    res.json({
      message: 'Success',
      result: roboflowResponse.data
    });
  } catch (err) {
    res.status(500).json({
      error: 'Roboflow API failed',
      details: err.response?.data || err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Sunucu ${PORT} portunda çalışıyor.`);
});