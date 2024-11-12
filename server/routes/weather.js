import express from 'express';
import fetch from 'node-fetch';
import pool from '../database/init.js';

const router = express.Router();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

// Get weather data for a location
router.get('/forecast/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const response = await fetch(
      `${WEATHER_API_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${WEATHER_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Weather API request failed');
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Get current weather alerts
router.get('/alerts', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM weather_alerts ORDER BY created_at DESC LIMIT 5'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather alerts' });
  }
});

// Create weather alert
router.post('/alerts', async (req, res) => {
  try {
    const { type, severity, description } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO weather_alerts (type, severity, description) VALUES (?, ?, ?)',
      [type, severity, description]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create weather alert' });
  }
});

export default router;