const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/predict", async (req, res) => {
  const { imageUrl } = req.body;

  try {
    const response = await axios.post(
      `https://detect.roboflow.com/${process.env.ROBOFLOW_MODEL}?api_key=${process.env.ROBOFLOW_API_KEY}`,
      {
        image: imageUrl
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      error: "Roboflow API failed",
      details: err.response?.data || err.message
    });
  }
});

app.listen(3000, () => {
  console.log("Sunucu 3000 portunda çalışıyor.");
});