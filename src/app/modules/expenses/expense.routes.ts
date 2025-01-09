import express from "express";
import { expenseController } from "./expense.controller";
import validateRequest from "../../middlewares/validateRequest";
import { expenseValidationSchema } from "./expense.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post('/tasks', validateRequest(expenseValidationSchema.expenseValidationSchemaZod
), expenseController.createExpense)

// router.get('/all-tasks', expenseController.getExpenses);
router.get('/tasks', expenseController.getDailyExpenses);
router.put('/tasks/:id', validateRequest(expenseValidationSchema.expenseUpdateValidationSchemaZod), expenseController.updateExpense);

router.delete('/tasks/:id',  expenseController.deleteExpense);


// monthly limitation routes start here
router.post('/limit-create', validateRequest(expenseValidationSchema.monthlyLimitValidationSchemaZod), expenseController.createMonthlyLimit)
export const expenseRoutes=router