import { IMonthlyLimit } from "./expense.interface"
import { Expense, MonthlyLimit } from "./expense.model"

const createExpenseIntoDB = async (payload: any) => {
    // Step 1: Fetch the user's monthly limit and spending limits
    const monthlyLimitData = await MonthlyLimit.findOne({ email: payload.email });
    if (!monthlyLimitData) {
        throw new Error("Monthly limit not set for this user.");
    }

    const { spendingLimits } = monthlyLimitData;

    // Step 2: Find the spending limit for the category
    const categoryObject = spendingLimits.find(limit => limit.category === payload.category);
    if (!categoryObject) {
        throw new Error(`Category ${payload.category} not found in spending limits.`);
    }

    const categoryLimit = categoryObject.amount;

    // Step 3: Check if the category amount exceeds the spending limit
    if (payload.amount > categoryLimit) {
        throw new Error(`Amount for ${payload.category} exceeds the spending limit.`);
    }

    // Step 4: Validate the createdAt field
    if (!payload.createdAt || isNaN(new Date(payload.createdAt).getTime())) {
        throw new Error("Invalid or missing date provided for createdAt.");
    }

    const createdAtDate = new Date(payload.createdAt);

    // Step 5: Check if an expense already exists for the given email, category, and date
    const startOfDay = new Date(createdAtDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(createdAtDate.setHours(23, 59, 59, 999));

    const existingExpense = await Expense.findOne({
        email: payload.email,
        category: payload.category,
        createdAt: { $gte: startOfDay, $lt: endOfDay }
    });

    // Step 6: Update the existing expense or create a new one
    if (existingExpense) {
        // Calculate the new total amount
        const newTotalAmount = existingExpense.amount + payload.amount;

        // Check if the new total amount exceeds the category limit
        if (newTotalAmount > categoryLimit) {
            throw new Error(`Total amount for ${payload.category} exceeds the spending limit.Your ${payload.category} limitation is ${categoryLimit}`);
        }

        // Update the existing expense with the new amount
        existingExpense.amount = newTotalAmount;
        const result = await existingExpense.save();
        return result;
    } else {
        // Create a new expense record
        const result = await Expense.create(payload);
        return result;
    }
};



const updateExpenseInDB = async (email: string, date: string, categoriesToUpdate: any) => {
  

    const monthlyLimitData = await MonthlyLimit.findOne({ email });
    if (!monthlyLimitData) {
        throw new Error("Monthly limit not set for this user.");
    }
    const { spendingLimits } = monthlyLimitData;


    // Step 2: Find the expense record for the specific user and date
    const expenseRecords = await Expense.find({
        email,
        createdAt: { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) }
    });

    if (!expenseRecords.length) {
        throw new Error("No expense record found for this date.");
    }

    // Ensure categoriesToUpdate is an array
    if (!Array.isArray(categoriesToUpdate.categories)) {
        throw new Error("categoriesToUpdate should be an array.");
    }

    // Step 3: Update the expense records with the new amounts
    for (const expenseRecord of expenseRecords) {
        const updateCategory = categoriesToUpdate.categories.find(
            (cat: any) => cat.category === expenseRecord.category
        );

        if (updateCategory) {
           
        
            // Find the category object in the spendingLimits array
            const categoryObject = spendingLimits.find(limit => limit.category === updateCategory.category);
        
            // If categoryObject is not found, throw an error
            if (!categoryObject) {
                throw new Error(`Category ${updateCategory.category} not found in spending limits.`);
            }
        
            // Get the limit for the category
            const categoryLimit = categoryObject.amount;
        
        
            // Check if the amount exceeds the limit
            if (updateCategory.amount > categoryLimit) {
                throw new Error(
                    `Amount for ${updateCategory.category} exceeds the spending limit.`
                );
            }
        
            // Update the expense record with the new amount
            expenseRecord.amount = updateCategory.amount;
            await expenseRecord.save();
        }
        
        
    }

    return expenseRecords;
};


const getDailyExpense = async (email: string, filterBy: string) => {
    const groupByField = `$${filterBy}`;
    const result = await Expense.aggregate([
        {
            $match: { email }
        },
        {
            $group: {
                _id: { field: groupByField, category: "$category", date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } },
                totalAmount: { $sum: "$amount" }
            }
        },
        {
            $group: {
                _id: `$_id.field`,
                categories: {
                    $push: {
                        category: "$_id.category",
                        amount: "$totalAmount",
                        date: "$_id.date",
                    
                    }
                },
                dailyTotal: { $sum: "$totalAmount" }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);
    
    return result;
}
const deleteExpenseFromDB = async (payload:{date:string,email:string}) => {
    const startOfDay = new Date(new Date(payload.date).setHours(0, 0, 0, 0));
    const endOfDay = new Date(new Date(payload.date).setHours(23, 59, 59, 999));
    const result = await Expense.deleteMany({
        email: payload.email,
        createdAt: { $gte: startOfDay, $lt: endOfDay }
    });
    return result;
}


// monthlyLimit services 

const createMonthlyLimitIntoDB = async (payload: IMonthlyLimit) => {
    // Check if the monthly limit already exists for the user
    const existingLimit = await MonthlyLimit.findOne({ email: payload.email });

    if (existingLimit) {
        // Update the existing monthly limit
        existingLimit.spendingLimits = payload.spendingLimits;
        const result = await existingLimit.save();
        return result;
    } else {
        // Create a new monthly limit
        const result = await MonthlyLimit.create(payload);
        return result;
    }
}









export const expenseServices={
    createExpenseIntoDB,
    updateExpenseInDB,
    getDailyExpense,
    deleteExpenseFromDB,
    createMonthlyLimitIntoDB
}