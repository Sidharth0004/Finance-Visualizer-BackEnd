// models/Budget.js
import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  month: {
    type: String, // format: 'YYYY-MM'
    required: true,
    match: /^\d{4}-(0[1-9]|1[0-2])$/, // ensures 'YYYY-MM' format
  }
}, { timestamps: true });

budgetSchema.index({ category: 1, month: 1 }, { unique: true }); // prevents duplicate budget per category/month

export default mongoose.model('Budget', budgetSchema);
