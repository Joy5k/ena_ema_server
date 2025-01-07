import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const router = express.Router();

router.put('/create-admin', userController.createAdmin)

router.get('/all-users',userController.getAllUsers),

router.put('/update', 
validateRequest(userValidation.updateUserValidationSchema),userController.updateMe)

router.put('/userToSeller',
userController.changeRoleUserToSeller)


router.get('/getMe',  userController.getMe)

router.put('/block/:id', userController.blockUser),

router.delete('/delete/:id',userController.deleteUser)

export const userRoutes=router;