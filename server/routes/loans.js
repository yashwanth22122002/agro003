import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../database/init.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all loans for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM loans WHERE user_id = ?',
      [req.user.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch loans' });
  }
});

// Apply for a new loan
router.post('/',
  authenticateToken,
  [
    body('type').notEmpty(),
    body('amount').isNumeric(),
    body('interest_rate').isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { type, amount, interest_rate } = req.body;
      const [result] = await pool.execute(
        'INSERT INTO loans (user_id, type, amount, interest_rate, status) VALUES (?, ?, ?, ?, ?)',
        [req.user.id, type, amount, interest_rate, 'PENDING']
      );

      res.status(201).json({ id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create loan application' });
    }
  }
);

export default router;