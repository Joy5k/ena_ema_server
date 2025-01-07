import express from 'express';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../shared/type';


const router = express.Router();
router.post("/register",AuthController.registerUser)

router.post( '/login',  AuthController.loginUser);

router.post(
    '/refresh-token',
    AuthController.refreshToken
)

router.post(
    '/change-password',
    auth(
    USER_ROLE.SUPER_ADMIN,
       USER_ROLE.ADMIN,
       USER_ROLE.USER,
    ),
    AuthController.changePassword
);


export const AuthRoutes = router;