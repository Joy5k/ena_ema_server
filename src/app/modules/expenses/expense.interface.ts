
export interface IExpense{
    category:string;
    amount:number;
    purpose:string;
    email:string;
}

export interface IMonthlyLimit {
    email: string;
  monthlyLimit?: number;
  spendingLimits: Array<{
    category: string;
    amount: number;
  }>;
}