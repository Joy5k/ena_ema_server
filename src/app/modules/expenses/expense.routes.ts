import express from "express";
import { expenseController } from "./expense.controller";
import validateRequest from "../../middlewares/validateRequest";
import { expenseValidationSchema } from "./expense.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post('/create', validateRequest(expenseValidationSchema.expenseValidationSchemaZod
),  expenseController.createExpense)
router.put('/update/:id', validateRequest(expenseValidationSchema.expenseValidationSchemaZod), expenseController.updateExpense);

router.delete('/delete/:id',  expenseController.deleteExpense);

router.get('/get-all', expenseController.getExpenses);

// monthly limitation routes start here
router.post("/limit-create", validateRequest(expenseValidationSchema.monthlyLimitValidationSchemaZod), expenseController.createMonthlyLimit)
export const expenseRoutes=router