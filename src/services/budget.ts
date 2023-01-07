import { BudgetDto, BudgetEntity, BudgetsBalanceCategory, BudgetsBalanceEntity } from "../interfaces/services/budget.interface";
import { Services } from "../interfaces/services/service.interface";
import { getPipeDateTimeString } from "../utils/date.util";
import { getPipeMoneyNumber } from "../utils/money.util";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_BUDGETS } from "../constants/storage.constant";
import { AppCategoryService } from "./category";
import { AppFinanceService } from "./finance";
import { AppBalanceService } from "./balance";
import { AppDebtsService } from "./debts";

class Budget implements BudgetEntity {
    id: number;
    createdAt: string;
    updatedAt?: string | undefined;
    year: string;
    month: string;
    value: number;
    categories: { categoryId: number; total: number; }[];
    debts: { debtId: number; total: number; }[];

    constructor(budgetDto: BudgetDto, id: number) {
        this.id = id + 1;
        this.year = budgetDto.year;
        this.month = budgetDto.month;
        this.categories = budgetDto.categories;
        this.debts = budgetDto.debts;
        this.value = getPipeMoneyNumber(budgetDto.total);
        this.createdAt = getPipeDateTimeString();
    }
}

class BudgetService implements Services<BudgetEntity, BudgetDto>{

    public async find(): Promise<BudgetEntity[]> {
        const budgets = await AsyncStorage.getItem(ASYNC_BUDGETS);
        return JSON.parse(budgets ?? JSON.stringify([]));
    }

    public async getBudgetBalance(month: string, year: string): Promise<BudgetsBalanceEntity | undefined> {
        const budgets = await this.find();
        const debts = await AppDebtsService.findInstitutions();
        const budget = budgets.find(budget => budget.month == month && budget.year == year);
        const { categories, totalExpense } = await AppBalanceService.getFinancesBalancePerCategory(month, year, 1);

        if (!budget?.categories) return;

        const budgetCategoriesFilter: BudgetsBalanceCategory[] = [];

        for (const budgetCategory of budget.categories) {
            const findCategory = categories.find(c => c.category?.id == budgetCategory.categoryId);
            if (!findCategory) {
                const category = await AppCategoryService.findOne(budgetCategory.categoryId);
                if (!category) continue
                budgetCategoriesFilter.push({ ...budgetCategory, category, used: 0 });
                continue
            }

            const { category, total } = findCategory;
            budgetCategoriesFilter.push({ ...budgetCategory, category, used: total })
        }

        for (const debtCategory of budget.debts) {
            const findDebt = categories.find(debt => debt.bill?.id == debtCategory.debtId)
            if (!findDebt) {
                const debt = await debts.find(debt => debt.id == debtCategory.debtId);
                if (!debt) continue;

                budgetCategoriesFilter.push({ ...debtCategory, debt, used: 0 });
                continue
            }

            const { bill, total } = findDebt;
            budgetCategoriesFilter.push({ ...debtCategory, debt: bill?.institution, used: total })
        }

        return { ...budget, categories: budgetCategoriesFilter, totalExpense }
    }

    public async delete(id: number): Promise<BudgetEntity[]> {
        const budgets = await this.find();
        const remove = budgets.filter(budget => budget.id !== id);
        await AsyncStorage.setItem(ASYNC_BUDGETS, JSON.stringify(remove));

        return remove
    }

    public async findOne(id: number): Promise<BudgetEntity | undefined> {
        const budgets = await this.find();
        return budgets.find(budget => budget.id == id);
    }

    public async create(createDto: BudgetDto): Promise<BudgetEntity> {
        const budgets = await this.find();

        const filter = budgets.filter(budget => budget.month == createDto.month && budget.year == createDto.year);
        if (filter.length) throw new Error('Orçamento já criado');

        const lastBudget = this.findLast(budgets);
        const budget = new Budget(createDto, lastBudget?.id ?? 0);
        budgets.push(budget);

        await AsyncStorage.setItem(ASYNC_BUDGETS, JSON.stringify(budgets));

        return budget;
    }

    public async update(id: number, updateDto: BudgetDto): Promise<BudgetEntity | undefined> {
        return
    }

    protected findLast(budgets: BudgetEntity[]): BudgetEntity | undefined {
        return budgets[budgets.length - 1];
    }
}

export const AppBudgetService = new BudgetService()