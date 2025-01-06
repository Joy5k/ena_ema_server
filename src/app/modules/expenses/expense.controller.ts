import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { expenseServices } from "./expense.services";


const createExpense=catchAsync(async(req,res)=>{
    const payload=req.body
    const result= await expenseServices.createExpenseIntoDB(payload)
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"Expenses record save into database successfully",
        data:result
    })
})


export const expenseController={
    createExpense
}