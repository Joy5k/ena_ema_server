// backend/models/Expense.js
import  { model, Schema } from 'mongoose';
import { IExpense } from './expense.interface';

const expenseSchema = new Schema<IExpense>({
  category: { type: String, required: true },
  purpose: { type: String, required: true },
  amount: { type: Number, required: true },

},{
    timestamps:true
});

export const Expense = model<IExpense>('Expense', expenseSchema);
