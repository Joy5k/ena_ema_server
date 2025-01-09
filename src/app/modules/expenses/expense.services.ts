import { IMonthlyLimit } from "./expense.interface"
import { Expense, MonthlyLimit } from "./expense.model"

const createExpenseIntoDB = async (payload: any) => {
    const existingExpense = await Expense.findOne({ email: payload.email, category: payload.category });
    if (existingExpense) {
        existingExpense.amount += payload.amount;
        const result = await existingExpense.save();
        return result;
    } else {
        const result = await Expense.create(payload);
        return result;
    }
}


const updateExpenseInDB = async (email: string, date: string, categoriesToUpdate: any) => {
    // Step 1: Fetch the user's monthly limit and spending limits
    const monthlyLimitData = await MonthlyLimit.findOne({ email });
    if (!monthlyLimitData) {
        throw new Error("Monthly limit not set for this user.");
    }
console.log(categoriesToUpdate)
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
            const categoryLimit = spendingLimits[updateCategory.category as keyof typeof spendingLimits];
            if (updateCategory.amount > categoryLimit) {
                throw new Error(
                    `Amount for ${updateCategory.category} exceeds the spending limit.`
                );
            }
            expenseRecord.amount = updateCategory.amount;
            await expenseRecord.save();
        }
    }

    return expenseRecords;
};
const upsertExpenseInDB = async (email: string, date: string, categoriesToUpdate: any) => {
    // Step 1: Fetch the user's monthly limit and spending limits
    const monthlyLimitData = await MonthlyLimit.findOne({ email });
    if (!monthlyLimitData) {
        throw new Error("Monthly limit not set for this user.");
    }

    const { spendingLimits } = monthlyLimitData;

    // Ensure categoriesToUpdate is an array
    if (!Array.isArray(categoriesToUpdate.categories)) {
        throw new Error("categoriesToUpdate should be an array.");
    }

    // Step 2: Iterate through the categories to update or create expenses
    for (const updateCategory of categoriesToUpdate.categories) {
        const categoryLimit = spendingLimits[updateCategory.category as keyof typeof spendingLimits];
        if (updateCategory.amount > categoryLimit) {
            throw new Error(
                `Amount for ${updateCategory.category} exceeds the spending limit.`
            );
        }

        const expenseRecord = await Expense.findOne({
            email,
            category: updateCategory.category,
            createdAt: { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) }
        });

        if (expenseRecord) {
            expenseRecord.amount = updateCategory.amount;
            await expenseRecord.save();
        } else {
            await Expense.create({
                email,
                category: updateCategory.category,
                amount: updateCategory.amount,
                createdAt: new Date(date)
            });
        }
    }

    return await Expense.find({ email, createdAt: { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) } });
};


const getAllExpensesFromDB = async () => {
    const result = await Expense.find();
    return result;
}
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
const deleteExpenseFromDB = async (id: string) => {
    const result = await Expense.findByIdAndDelete(id);
    return result;
}


// monthlyLimit services 

const createMonthlyLimitIntoDB=async(payload:IMonthlyLimit)=>{
    const result= await MonthlyLimit.create(payload)
    return result
}









export const expenseServices={
    createExpenseIntoDB,
    updateExpenseInDB,
    getAllExpensesFromDB,
    getDailyExpense,
    deleteExpenseFromDB,
    createMonthlyLimitIntoDB
}