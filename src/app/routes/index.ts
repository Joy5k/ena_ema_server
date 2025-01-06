import express from 'express';
import { expenseRoutes } from '../modules/expenses/expense.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/expense',
        route: expenseRoutes
    },
    
    {
        path: '/auth',
        route: AuthRoutes
    },
    
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;