const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'archived'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
    bufferCommands: false,
  },
);

module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);
