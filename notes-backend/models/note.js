const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
  {
    note_title: {
      type: String,
      required: true,
      trim: true,
    },
    note_content: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'modified_at' }
  }
);

const Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;
