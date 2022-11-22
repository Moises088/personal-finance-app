import { CategoryEntity } from "./category.interface";

interface Budget {
    year: string;
    month: string;
    categories: {
        categoryId: number;
        total: number;
    }[];
}
export interface BudgetDto extends Budget { 
    total: string
}

export interface BudgetEntity extends Budget {
    id: number;
    value: number;
    createdAt: string;
    updatedAt?: string;
}