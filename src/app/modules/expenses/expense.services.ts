import { Expense } from "./expense.model"

const createExpenseIntoDB=async(payload:any)=>{

    const result= await Expense.create(payload)
    return result
}


export const expenseServices={
    createExpenseIntoDB
}