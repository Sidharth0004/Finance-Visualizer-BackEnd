import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true, 
      trim: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      default: "expense",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
