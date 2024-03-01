const express = require("express");
const router = express.Router();
const z = require("zod");
const bcrypt = require("bcrypt");

const newUserModel = require("../models/userModel");

router.get("/getUserById/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await newUserModel.findById(userId);
    if (!user) {
      return res.status(404).send("userId does not exist.");
    }
    return res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


module.exports = router;
