
import Budget from '../models/Budget.js';

// Get all budgets
export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch budgets' });
  }
};

// Get budgets by month (useful for charts)
export const getBudgetsByMonth = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: 'Month is required in format YYYY-MM' });
  }

  try {
    const budgets = await Budget.find({ month });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch budgets for month' });
  }
};

// Get budget by category and month
export const getBudgetByCategory = async (req, res) => {
  const { category } = req.params;
  const { month } = req.query;

  try {
    const query = month ? { category, month } : { category };
    const budget = await Budget.findOne(query);
    if (!budget) return res.status(404).json({ error: 'Budget not found' });
    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch budget by category' });
  }
};

// Create a new budget
export const createBudget = async (req, res) => {
  const { category, amount, month } = req.body;

  if (!category || !month || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Category, month, and valid amount are required' });
  }

  try {
    const existing = await Budget.findOne({ category, month });
    if (existing) {
      return res.status(400).json({ error: 'Budget for this category and month already exists' });
    }

    const newBudget = new Budget({ category, amount, month });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(400).json({ error: 'Invalid budget data' });
  }
};

// Update existing budget
export const updateBudget = async (req, res) => {
  const { amount } = req.body;

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Valid amount is required for update' });
  }

  try {
    const updated = await Budget.findByIdAndUpdate(req.params.id, { amount }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Budget not found' });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update budget' });
  }
};

// Delete budget
export const deleteBudget = async (req, res) => {
  try {
    const deleted = await Budget.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Budget not found' });

    res.json({ message: 'Budget deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete budget' });
  }
};
