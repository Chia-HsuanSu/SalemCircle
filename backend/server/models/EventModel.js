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

//method for updating/editing events
eventSchema.statics.updateEvent = async function (eventId, updatedEvent) {
  try {
    const existingEvent = await this.findOne({ eventId: eventId });
    if (!existingEvent) {
      return { success: false, message: 'Event not found' };
    }

    const result = await this.findOneAndUpdate({ eventId: eventId }, { $set: updatedEvent }, { new: true, runValidators: true });
    if (result.nModified > 0) {
      return { success: true, message: 'Event updated successfully' };
    } else {
      return { success: false, message: 'Event updated successfully', data: existingEvent };
    }
  } catch (error) {
    console.error(`Failed to update event: ${error.message}`);
    throw new Error(`Failed to update event: ${error.message}`);
  }
};

// Delete event method
eventSchema.statics.deleteEvent = async function (eventId) {
  try {
    const result = await this.deleteOne({ eventId });
    return result.deletedCount > 0; // Return true if at least one document was deleted
  } catch (error) {
    throw error;
  }
};

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
