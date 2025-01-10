import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { expenseServices } from "./expense.services";
import CustomError from "../../error/customError";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";


const createExpense=catchAsync(async(req,res)=>{
    
    const authToken = req.headers.authorization;

    const payload = { ...req.body, amount: Number(req.body.amount),
        createdAt: new Date().toISOString(),

    }
   
    if(!authToken){
        throw new CustomError(httpStatus.UNAUTHORIZED,"unauthorize access")
    }
    const {email}=jwtHelpers.verifyToken(authToken,config.jwt.jwt_access_secret as string) as {email:string,id:string}
    const expensesData={
        ...payload,
        email,

    }
    const result= await expenseServices.createExpenseIntoDB(expensesData)
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"Expenses record save into database successfully",
        data:result
    })
})


const updateExpense = catchAsync(async (req, res) => {
    const date = req.params.id as string;
    const payload = req.body;
    const authToken = req.headers.authorization;

    if (!authToken) {
        throw new CustomError(httpStatus.UNAUTHORIZED, "unauthorized access");
    }

    const { email } = jwtHelpers.verifyToken(authToken, config.jwt.jwt_access_secret as string) as { email: string, id: string };


    const result = await expenseServices.updateExpenseInDB(email,date, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Expense record updated successfully",
        data: result,
    });
});


const getDailyExpenses = catchAsync(async (req, res) => {
    const params=req.query.filter as string
    const authToken = req.headers.authorization;
    if (!authToken) {
        throw new CustomError(httpStatus.UNAUTHORIZED, "unauthorized access");
    }

    const { email } = jwtHelpers.verifyToken(authToken, config.jwt.jwt_access_secret as string) as { email: string, id: string };

    const result = await expenseServices.getDailyExpense(email,params);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Daily Expenses retrieved successfully",
        data: result,
    });
});

const deleteExpense = catchAsync(async (req, res) => {
    const { id:date } = req.params;
    const authToken = req.headers.authorization;

    if (!authToken) {
        throw new CustomError(httpStatus.UNAUTHORIZED, "unauthorized access");
    }

    const { email } = jwtHelpers.verifyToken(authToken, config.jwt.jwt_access_secret as string) as { email: string, id: string };
    const payload={
        date,
        email
    }
    await expenseServices.deleteExpenseFromDB(payload);
    sendResponse(res, {
        statusCode: httpStatus.NO_CONTENT,
        success: true,
        message: "Expense record deleted successfully",
        data:null
    });
});


const createMonthlyLimit = catchAsync(async (req, res) => {
    const {  spendingLimits } = req.body;
    const authToken = req.headers.authorization;
    if (!authToken) {
        throw new CustomError(httpStatus.UNAUTHORIZED, "unauthorized access");
    }

    const { email } = jwtHelpers.verifyToken(authToken, config.jwt.jwt_access_secret as string) as { email: string, id: string };

   

    const monthlyLimit = spendingLimits.reduce((acc: number, limit: any) => acc + Number(limit.amount), 0);

    const monthlyLimitData = {
        email,
        monthlyLimit,
        spendingLimits,
    };
    const result = await expenseServices.createMonthlyLimitIntoDB(monthlyLimitData);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Monthly limit record saved into database successfully",
        data: result,
    });
});

export const expenseController={
    createExpense,
    getDailyExpenses,
    updateExpense,
    deleteExpense,
    createMonthlyLimit
}