import express from 'express';
import { expenseRoutes } from '../modules/expenses/expense.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/expense',
        route: expenseRoutes
    },
    
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;