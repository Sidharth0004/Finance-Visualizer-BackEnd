import express from 'express';
import {
  getBudgets,
  getBudgetsByMonth,
  getBudgetByCategory,
  createBudget,
  updateBudget,
  deleteBudget
} from '../controllers/budgetController.js';

const router = express.Router();

// Smart handling of /budgets and /budgets?month=YYYY-MM
router.get('/', (req, res) => {
  if (req.query.month) {
    return getBudgetsByMonth(req, res);
  } else {
    return getBudgets(req, res);
  }
});

router.get('/category/:category', getBudgetByCategory);
router.post('/', createBudget);
router.patch('/:id', updateBudget);
router.delete('/:id', deleteBudget);

export default router;
