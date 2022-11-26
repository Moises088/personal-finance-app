import { CategoryEntity } from "../services/category.interface";
import { FinanceBalance, FinancesBalanceEntity } from "../services/finance.interface";
import { WalletEntity } from "../services/wallet.interface";

export interface FinanceDetailsProps {
    setCategory(category: CategoryEntity): void;
    category: CategoryEntity | undefined;
    setWallet(wallet: WalletEntity | undefined): void;
    wallet: WalletEntity | undefined;
    setPaidDate(paidAt: string): void;
    paidDate: string | undefined;
    setTitle(title: string): void;
    title: string | undefined;
    setDescription(description: string): void;
    description: string | undefined;
    setIsPaid(isPaid: boolean): void;
    isPaid: boolean | undefined;
}

export interface FinancesContextData {
    filteredMonth: string;
    filteredYear: string;
    setFilteredMonth(filteredMonth: string): void;
    setFilteredYear(filteredYear: string): void;
    getFinancesBalance: () => Promise<FinanceBalance>;
    finances: FinanceBalance | undefined;
}

export type ParamRoute = {
    Detail: {
        event: 'INCOME' | 'EXPENSE';
        finance?: FinancesBalanceEntity
    };
}

export interface FinanceForms {
    money: string | undefined;
    paidDate: string | undefined;
    title: string | undefined;
    description: string | undefined;
    category: CategoryEntity | undefined;
    wallet: WalletEntity | undefined;
    isPaid: boolean;
    id?: number
}