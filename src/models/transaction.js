const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Prevent duplicate transactions
// TransactionSchema.index({ user: 1, amount: 1, date: 1 }, { unique: true });

// populate user field with user data
TransactionSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name" });
  next();
});

module.exports = mongoose.model("Transaction", TransactionSchema);
