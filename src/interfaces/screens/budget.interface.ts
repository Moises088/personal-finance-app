import { CategoryEntity } from "../services/category.interface"

export interface BudgetFormCategories {
    category: CategoryEntity,
    total: string
}

export interface BudgetForms {
    total: string,
    categories: BudgetFormCategories[]
}