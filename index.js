const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/base64', async (req, res) => {
  const { base64Image } = req.body;

  if (!base64Image) {
    return res.status(400).json({ error: 'Image missing' });
  }

  try {
    const roboflowApiKey = process.env.ROBOFLOW_API_KEY;
    const modelId = "palm-line-detection-9zzh0";  // senin model id
    const url = `https://detect.roboflow.com/${modelId}/1?api_key=${roboflowApiKey}`;

    const roboflowResponse = await axios.post(url, {
      image: base64Image
    });

    // Başarıyla cevap aldıysan:
    res.json({
      message: "Prediction completed",
      predictions: roboflowResponse.data
    });

  } catch (error) {
    console.error("Roboflow hatası:", error.response?.data || error.message);
    res.status(500).json({ error: 'Roboflow API failed', details: error.message });
  }
});

app.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor.');
});