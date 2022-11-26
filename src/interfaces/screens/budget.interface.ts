import { BudgetsBalanceEntity } from "../services/budget.interface"
import { CategoryEntity } from "../services/category.interface"

export interface BudgetFormCategories {
    category: CategoryEntity,
    total: string
}

export interface BudgetForms {
    total: string,
    categories: BudgetFormCategories[]
}

export interface BudgetsContextData {
    budgets: BudgetsBalanceEntity | undefined;
    getBudgetsBalance(): Promise<BudgetsBalanceEntity | undefined>;
}