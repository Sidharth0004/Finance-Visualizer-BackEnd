// routes/transactionRoutes.js
import express from 'express';
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from '../controllers/transactionController.js';

const router = express.Router();

// Get all transactions, optionally filtered by ?month=YYYY-MM
router.get('/', getTransactions);

// Add a new transaction
router.post('/', createTransaction);

// Update an existing transaction
router.patch('/:id', updateTransaction);

// Delete a transaction
router.delete('/:id', deleteTransaction);

export default router;
