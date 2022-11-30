import { BudgetEntity } from "../services/budget.interface";
import { CategoryEntity } from "../services/category.interface";
import { DebtsEntity } from "../services/debts.interface";
import { FinanceEntity } from "../services/finance.interface";
import { WalletEntity } from "../services/wallet.interface";

export type MockProps = {
    ASYNC_CATEGORIES: CategoryEntity[];
    ASYNC_WALLETS: WalletEntity[];
    ASYNC_FINANCES: FinanceEntity[];
    ASYNC_BUDGETS: BudgetEntity[];
    ASYNC_DEBTS: DebtsEntity[];
}