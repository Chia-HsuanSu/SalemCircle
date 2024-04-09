const express = require('express');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const unlinkAsync = util.promisify(fs.unlink); // For async deletion of temp files
const path = require('path');
const router = express.Router();
const { uploadFile } = require('../utilities/googleCloudStorage'); 
const User = require('../models/userModel'); 
const { authenticateToken } = require('../middleware/auth');

// Multer configuration for file uploads
const upload = multer({
    dest: 'uploads/', // Temporary files folder
    limits: { fileSize: 5 * 1024 * 1024 }, // limit file size to 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('File is not an image.'), false);
        }
    },
});

// Route for uploading profile picture
router.post('/profile-picture', authenticateToken, upload.single('profilePicture'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded.' });
      }
    try {
        const userId = req.user.id; 
        const filePath = req.file.path;
        const destFileName = `profile-pictures/${userId}-${Date.now()}${path.extname(req.file.originalname)}`; // Ensures unique filenames
        

        // Upload the file to Google Cloud Storage
        const fileUrl = await uploadFile(filePath, destFileName, 'salem-circle');
        console.log(`Updating user ${userId} with profile image path: ${fileUrl}`);
        // Update the user's profileImagePath in the database
        await User.findByIdAndUpdate(userId, { profileImagePath: fileUrl }, { new: true });

         // Cleanup: delete the temporary file
         await unlinkAsync(filePath);

        res.json({ message: 'Profile picture updated successfully.', fileUrl });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).send(error.message);
    }
});


module.exports = router;
