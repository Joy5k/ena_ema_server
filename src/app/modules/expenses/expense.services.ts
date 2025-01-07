import { IMonthlyLimit } from "./expense.interface"
import { Expense, MonthlyLimit } from "./expense.model"

const createExpenseIntoDB=async(payload:any)=>{

    const result= await Expense.create(payload)
    return result
}



// monthlyLimit services 

const createMonthlyLimitIntoDB=async(payload:IMonthlyLimit)=>{
    const result= await MonthlyLimit.create(payload)
    return result
}









export const expenseServices={
    createExpenseIntoDB,

    createMonthlyLimitIntoDB
}