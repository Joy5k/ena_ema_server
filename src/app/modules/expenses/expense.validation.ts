import { z } from 'zod';



const expenseValidationSchemaZod = z.object({
   body:z.object({
    amount: z.number().positive(),
   
    category: z.enum(['Groceries', 'Transportation', 'Healthcare', 'Utility', 'Charity', 'Miscellaneous','other']),
    purpose:z.string(),
   })
});

export const expenseValidationSchema= { expenseValidationSchemaZod };