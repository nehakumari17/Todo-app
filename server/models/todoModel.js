const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

});

module.exports = mongoose.model("Todo", todoSchema);