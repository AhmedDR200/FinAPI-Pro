const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  recurring: {
    type: Boolean,
    default: false,
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly", "yearly"],
    required: function () {
      return this.recurring;
    },
  },
  nextOccurrence: {
    type: Date,
    required: function () {
      return this.recurring;
    },
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
