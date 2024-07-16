const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    min: 6,
    max: 32,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    min: 6,
    max: 32,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    max: 32,
    required: true,
  },
  todos: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Todo",
    },
  ]
});

// userSchema.set('toObject', { virtuals: true });
// userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("User", userSchema);