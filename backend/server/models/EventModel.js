const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
      label: "Event ID",
    },
    eventName: {
      type: String,
      required: true,
      label: "Event Name",
    },
    description: {
      type: String,
      required: true,
      label: "Description",
    },
    dateTime: {
      type: Date,
      required: true,
      label: "Date & Time",
    },
    capacity: {
      type: Number,
      required: true,
      label: "Capacity",
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { collection: "events" }
);

eventSchema.index({ eventId: 1 }, { unique: true });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
