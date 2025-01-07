import { z } from 'zod';



const expenseValidationSchemaZod = z.object({
   body:z.object({
    amount: z.number().positive(),
   
    category: z.enum(['Groceries', 'Transportation', 'Healthcare', 'Utility', 'Charity', 'Miscellaneous','other']),
    purpose:z.string(),
   })
});

const monthlyLimitValidationSchemaZod = z.object({
   body:z.object({
      email: z.string().email().optional(),
   monthlyLimit: z.number().positive().optional(),
   spendingLimits: z.object({
      Groceries: z.number().positive(),
      Transportation: z.number().positive(),
      Healthcare: z.number().positive(),
      Utility: z.number().positive(),
      Charity: z.number().positive(),
      Miscellaneous: z.number().positive(),
   }),
   })
});



export const expenseValidationSchema= { expenseValidationSchemaZod,monthlyLimitValidationSchemaZod };