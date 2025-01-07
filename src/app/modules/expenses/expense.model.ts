// backend/models/Expense.js
import  { model, Schema } from 'mongoose';
import { IExpense, IMonthlyLimit } from './expense.interface';

const expenseSchema = new Schema<IExpense>({
  category: { type: String, required: true },
  purpose: { type: String, required: true },
  amount: { type: Number, required: true },
  email:{type:String}
},{
    timestamps:true
});

export const Expense = model<IExpense>('Expense', expenseSchema);


const monthlySchema = new Schema<IMonthlyLimit>({
  email: {
    type: String,
    required: true
  },
  // Monthly spending limit
  monthlyLimit: {
    type: Number,
  },
  // Spending limits for each category
  spendingLimits: {
    Groceries: { type: Number, default: 0 },
    Transportation: { type: Number, default: 0 },
    Healthcare: { type: Number, default: 0 },
    Utility: { type: Number, default: 0 },
    Charity: { type: Number, default: 0 },
    Miscellaneous: { type: Number, default: 0 },
  }
});

export const MonthlyLimit = model<IMonthlyLimit>('MonthlyLimit', monthlySchema);

