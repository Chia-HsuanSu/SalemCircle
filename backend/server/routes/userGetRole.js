const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Route to get the logged-in user's role
router.get('/getRole', authenticateToken, (req, res) => {
  const role = req.user.role;
  res.json({ role: role });
})

module.exports = router;
