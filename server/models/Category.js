const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      maxlength: 250
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);
