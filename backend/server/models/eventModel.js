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
  },
  { collection: "events" }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
