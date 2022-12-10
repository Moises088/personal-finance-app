import { BudgetsBalanceEntity } from "../services/budget.interface"
import { CategoryEntity } from "../services/category.interface"
import { DebtsInstitution } from "../services/debts.interface"

export interface BudgetFormCategories {
    category: CategoryEntity,
    total: string
}

export interface BudgetFormDebts {
    debt: DebtsInstitution,
    total: string
}

export interface BudgetForms {
    total: string,
    categories: BudgetFormCategories[]
    debts: BudgetFormDebts[]
}

export interface BudgetsContextData {
    budgets: BudgetsBalanceEntity | undefined;
    getBudgetsBalance(): Promise<BudgetsBalanceEntity | undefined>;
    deleteBudget(id: number): Promise<void>;
}