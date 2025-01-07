import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { expenseServices } from "./expense.services";
import CustomError from "../../error/customError";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";


const createExpense=catchAsync(async(req,res)=>{
    const payload=req.body

    const authToken =req.headers.authorization

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
    const { id } = req.params;
    const payload = req.body;
    const authToken = req.headers.authorization;

    if (!authToken) {
        throw new CustomError(httpStatus.UNAUTHORIZED, "unauthorized access");
    }

    const { email } = jwtHelpers.verifyToken(authToken, config.jwt.jwt_access_secret as string) as { email: string, id: string };

    const updatedExpenseData = {
        ...payload,
        email,
    };

    const result = await expenseServices.updateExpenseInDB(id, updatedExpenseData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Expense record updated successfully",
        data: result,
    });
});

const getExpenses = catchAsync(async (req, res) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        throw new CustomError(httpStatus.UNAUTHORIZED, "unauthorized access");
    }

    const { email } = jwtHelpers.verifyToken(authToken, config.jwt.jwt_access_secret as string) as { email: string, id: string };

    const result = await expenseServices.getAllExpensesFromDB(email);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Expenses retrieved successfully",
        data: result,
    });
});

const deleteExpense = catchAsync(async (req, res) => {
    const { id } = req.params;
    const authToken = req.headers.authorization;

    if (!authToken) {
        throw new CustomError(httpStatus.UNAUTHORIZED, "unauthorized access");
    }

    const { email } = jwtHelpers.verifyToken(authToken, config.jwt.jwt_access_secret as string) as { email: string, id: string };

    await expenseServices.deleteExpenseFromDB(id);
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
    console.log(authToken);

    if (!authToken) {
        throw new CustomError(httpStatus.UNAUTHORIZED, "unauthorized access");
    }

    const { email } = jwtHelpers.verifyToken(authToken, config.jwt.jwt_access_secret as string) as { email: string, id: string };

   

    const monthlyLimit = (Object.values(spendingLimits) as number[]).reduce((acc: number, limit: number) => acc + limit, 0);

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
    getExpenses,
    updateExpense,
    deleteExpense,
    createMonthlyLimit
}