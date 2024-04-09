const express = require('express');
const router = express.Router();
const Comment = require('../models/commentModel');
const User = require('../models/userModel');
const { authenticateToken } = require('../middleware/auth');


// DELETE comment route
router.delete('/delete/:commentId', authenticateToken, async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Fetch the user's role to check if they're an admin
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(403).json({ message: 'User not found' });
        }

        // Check if the user is the comment owner or an admin
        if (comment.user.toString() === req.user.id || user.role === 'admin') {
            await Comment.deleteOne({ _id: commentId });
            res.json({ message: 'Comment deleted successfully' });
        } else {
            res.status(403).json({ message: 'Not authorized to delete this comment' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

