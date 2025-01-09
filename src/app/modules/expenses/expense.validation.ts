import { z } from 'zod';



const expenseValidationSchemaZod = z.object({
   body:z.object({
    amount: z.number().positive(),
   
    category: z.enum(['Groceries', 'Transportation', 'Healthcare', 'Utility', 'Charity', 'Miscellaneous','other']),
    purpose:z.string(),
   })
});
const expenseUpdateValidationSchemaZod = z.object({
   body: z.object({
      email: z.string().email().optional(),
      categories: z.array(z.object({
         category: z.enum(['Groceries', 'Transportation', 'Healthcare', 'Utility', 'Charity', 'Miscellaneous']),
         amount: z.number().positive(),
      })),
   }),
});

const monthlyLimitValidationSchemaZod = z.object({
   body: z.object({
     email: z.string().email().optional(),
     monthlyLimit: z.number().positive().optional(),
     spendingLimits: z.array(
       z.object({
         category: z.string(), // Validate category as a string
         amount: z.number().positive(), // Validate amount as a positive number
       })
     ),
   }),
 });



export const expenseValidationSchema= {
    expenseUpdateValidationSchemaZod,
   expenseValidationSchemaZod,
   monthlyLimitValidationSchemaZod };