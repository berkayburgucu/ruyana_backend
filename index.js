const express = require("express");
const axios = require("axios");
const app = express();

require("dotenv").config();
app.use(express.json({ limit: "10mb" }));

app.post("/base64", async (req, res) => {
  const imageUrl = req.body.imageUrl;

  if (!imageUrl) {
    return res.status(400).json({ error: "Missing imageUrl" });
  }

  const roboflowApiKey = process.env.ROBOFLOW_API_KEY;
  const modelId = "palm-line-detection-9zzh0";  // doğruysa bunu bırak
  const url = `https://detect.roboflow.com/${modelId}?api_key=${roboflowApiKey}`;

  try {
    const roboflowResponse = await axios.post(url, {
      image: imageUrl
    });

    return res.json({
      message: "Prediction completed",
      prediction: roboflowResponse.data
    });
  } catch (error) {
    return res.status(400).json({
      error: "Roboflow API failed",
      details: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Sunucu 3000 portunda çalışıyor.");
});