// backend/models/Expense.js
import  { model, Schema } from 'mongoose';
import { IExpense } from './expense.interface';
import { string } from 'zod';

const expenseSchema = new Schema<IExpense>({
  category: { type: String, required: true },
  purpose: { type: String, required: true },
  amount: { type: Number, required: true },
  email:{type:String}
},{
    timestamps:true
});

export const Expense = model<IExpense>('Expense', expenseSchema);
