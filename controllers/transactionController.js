import Transaction from "../models/Transaction.js";
import Budget from "../models/Budget.js";

// Get all or monthly filtered transactions
export const getTransactions = async (req, res) => {
  try {
    const { month } = req.query;

    let transactions;

    if (month) {
      const [year, mon] = month.split("-");
      const start = new Date(`${year}-${mon}-01`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);

      transactions = await Transaction.find({
        date: { $gte: start, $lt: end },
      }).sort({ date: -1 });
    } else {
      transactions = await Transaction.find().sort({ date: -1 });
    }

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Create a transaction with validation
export const createTransaction = async (req, res) => {
  const { amount, description, date, category, type } = req.body;

  if (
    typeof amount !== "number" ||
    !description ||
    !date ||
    !category ||
    !type
  ) {
    return res
      .status(400)
      .json({ error: "All fields are required and must be valid" });
  }

  try {
    const categoryExists = await Budget.findOne({ category });
    if (!categoryExists) {
      return res
        .status(400)
        .json({ error: "Category is not valid. Add a budget first." });
    }

    const newTransaction = new Transaction({
      amount,
      description,
      date,
      category,
      type,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ error: "Invalid transaction data" });
  }
};

// Update transaction with validation
export const updateTransaction = async (req, res) => {
  const { amount, description, date, category, type } = req.body;

  if (
    typeof amount !== "number" ||
    !description ||
    !date ||
    !category ||
    !type
  ) {
    return res
      .status(400)
      .json({ error: "All fields are required and must be valid" });
  }

  try {
    const categoryExists = await Budget.findOne({ category });
    if (!categoryExists) {
      return res
        .status(400)
        .json({ error: "Category is not valid. Add a budget first." });
    }

    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      { amount, description, date, category, type },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update transaction" });
  }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
