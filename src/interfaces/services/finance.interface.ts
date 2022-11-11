interface Finance {
    name: string;
    description?: string;
    categoryId: number;
    walletId: number;
    isPaid: boolean;
}
export interface FinanceDto extends Finance {
    paid: number;
    money: string;
}
export interface FinanceEntity extends Finance {
    id: number;
    paidAt: string;
    value: number;
    createdAt: string;
    updatedAt?: string;
}