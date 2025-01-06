import express from "express";
import { expenseController } from "./expense.controller";
import validateRequest from "../../middlewares/validateRequest";
import { expenseValidationSchema } from "./expense.validation";

const router = express.Router();

router.post('/create',validateRequest(expenseValidationSchema.expenseValidationSchemaZod
),  expenseController.createExpense)

export const expenseRoutes=router