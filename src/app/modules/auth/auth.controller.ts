import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AuthServices } from "./auth.services";
import CustomError from "../../error/customError";
import { tokenDecoded } from "../../../shared/userAuth";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.loginUser(req.body);
    const { refreshToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: true, 
        httpOnly: true, 
    });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Logged in successfully!",
        data: {
            accessToken: result.accessToken,
        }
    })
});
const registerUser=catchAsync(async(req:Request,res:Response)=>{
    const payload=req.body;
    const result=await AuthServices.registerUser(payload)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Registered successfully!",
        data: result
     
    })
})
const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await AuthServices.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Access token generated successfully!",
        data: result
     
    })
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
    // const user = req.user;
    const user = req;
    const result = await AuthServices.changePassword(user, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password Changed successfully",
        data: result
    })
});




export const AuthController = {
    loginUser,
    registerUser,
    refreshToken,
    changePassword,
   
};