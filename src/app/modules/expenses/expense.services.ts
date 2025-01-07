import { IMonthlyLimit } from "./expense.interface"
import { Expense, MonthlyLimit } from "./expense.model"

const createExpenseIntoDB = async (payload: any) => {
    const existingExpense = await Expense.findOne({ email: payload.email, category: payload.category });
    if (existingExpense) {
        existingExpense.amount += payload.amount;
        const result = await existingExpense.save();
        return result;
    } else {
        const result = await Expense.create(payload);
        return result;
    }
}


const updateExpenseInDB = async (id: string, payload: any) => {
    const result = await Expense.findByIdAndUpdate(id, payload, { new: true });
    return result;
}

const getAllExpensesFromDB = async (email:string) => {
    const result = await Expense.find({email});
    return result;
}

const deleteExpenseFromDB = async (id: string) => {
    const result = await Expense.findByIdAndDelete(id);
    return result;
}


// monthlyLimit services 

const createMonthlyLimitIntoDB=async(payload:IMonthlyLimit)=>{
    const result= await MonthlyLimit.create(payload)
    return result
}









export const expenseServices={
    createExpenseIntoDB,
    updateExpenseInDB,
    getAllExpensesFromDB,
    deleteExpenseFromDB,
    createMonthlyLimitIntoDB
}