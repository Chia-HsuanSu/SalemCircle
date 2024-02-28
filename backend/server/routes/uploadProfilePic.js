const express = require("express");
const multer = require("multer");
const path = require("path");
const newUserModel = require('../models/userModel');

const router = express.Router();

// Set up storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

// Filter files by type
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // Rejects storing a file
        cb(null, false);
    }
};

// Initialize upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // for 5MB
    },
    fileFilter: fileFilter
});

router.post('/uploadProfilePicture', upload.single('profilePic'), async (req, res) => {
    const userId = req.body.userId;
    const profilePicPath = req.file.path;

    try {
        await newUserModel.findByIdAndUpdate(userId, { profilePic: profilePicPath });
        res.status(200).send({ message: "Profile picture updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "An error occurred while updating the profile picture" });
    }
});

module.exports = router;
