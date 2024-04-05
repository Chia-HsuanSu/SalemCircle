const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Route to get the logged-in user's role
router.get('/getRole', authenticateToken, (req, res) => {
  if(req.user && req.user.role) {
    res.json({ role: req.user.role });
  } else {
    res.status(400).json({ error: "Role not found" });
  }
})


module.exports = router;
