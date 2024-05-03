const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Make sure this path matches your setup

// Route to delete a user
router.delete('/delete/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully', deletedUserId: userId });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
