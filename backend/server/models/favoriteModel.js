const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', // Reference to the User model,
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event', // Reference to the Event model
      required: true,
    },
  },
  { collection: 'favorites' }
);

favoriteSchema.index({ user: 1, event: 1 }, { unique: true }); //not working remember to fix

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
