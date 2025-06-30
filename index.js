const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/infer', async (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) return res.status(400).json({ error: "URL eksik" });

  try {
    const rf = await axios.post(
      `https://detect.roboflow.com/palm-line-detection-9zzh0/1`,
      null,
      {
        params: {
          api_key: process.env.ROBOFLOW_API_KEY,
          image: imageUrl,
          confidence: 40,
          overlap: 30
        }
      }
    );
    res.json({ predictions: rf.data.predictions });
  } catch (err) {
    res.status(500).json({ error: "Roboflow API failed", details: err.response?.data || err.message });
  }
});