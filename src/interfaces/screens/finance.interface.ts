import { CategoryEntity } from "../services/category.interface";
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