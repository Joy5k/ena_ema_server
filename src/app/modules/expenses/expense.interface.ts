
export interface IExpense{
    category:string;
    amount:number;
    purpose:string;
    email:string;
}

export interface IMonthlyLimit {
    email: string;
    monthlyLimit?: number;
    spendingLimits: {
        Groceries: number;
        Transportation: number;
        Healthcare: number;
        Utility: number;
        Charity: number;
        Miscellaneous: number;
    };
}