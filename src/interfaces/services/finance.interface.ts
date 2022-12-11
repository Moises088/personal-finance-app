import { CategoryEntity } from "./category.interface";
import { DebtsEntity, DebtsInstitution } from "./debts.interface";

interface Finance {
    name: string;
    description?: string;
    categoryId: number;
    walletId: number;
    isPaid: boolean;
    type: 'INCOME' | 'EXPENSE'
}
export interface FinanceDto extends Finance {
    paid: string;
    money: string;
    billId: number;
}
export interface FinanceEntity extends Finance {
    id: number;
    paidAt: string;
    value: number;
    createdAt: string;
    updatedAt?: string;
    billId: number;
}

export interface FinancesBalanceEntity extends FinanceEntity {
    category: CategoryEntity | undefined;
    bill: DebtsInstitution | undefined;
}

export interface FinanceBalance {
    total: number;
    totalIncome: number;
    totalExpense: number;
    finances: FinancesBalanceEntity[];
}

export interface FinanceBalancePerCategory {
    bill?: { institution: DebtsInstitution | undefined, id: number };
    category: CategoryEntity | undefined;
    total: number;
}