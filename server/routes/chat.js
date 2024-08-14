const express = require('express');
const axios = require('axios');
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();
const GEN_AI_API_KEY = process.env.GEN_AI;

// Route to proxy chat requests
router.post('/', async (req, res) => {
  try {
    const response = await axios.post('https://genai-ca.geotab.com/chat', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': GEN_AI_API_KEY // Use the api-key from .env
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
});

module.exports = router;