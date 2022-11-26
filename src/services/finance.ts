import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_FINANCES } from "../constants/storage.constant";
import { FinanceBalance, FinanceBalancePerCategory, FinanceDto, FinanceEntity, FinancesBalanceEntity } from "../interfaces/services/finance.interface";
import { Services } from "../interfaces/services/service.interface";
import { getPipeDateTimeString } from "../utils/date.util";
import { getPipeMoneyNumber } from "../utils/money.util";
import { AppCategoryService } from "./category";

class Finance implements FinanceEntity {
    id: number;
    name: string;
    description?: string | undefined;
    value: number;
    categoryId: number;
    walletId: number;
    paidAt: string;
    isPaid: boolean;
    type: "INCOME" | "EXPENSE";
    createdAt: string;
    updatedAt?: string;

    constructor(createFinanceDto: FinanceDto, lastId: number) {
        this.id = lastId + 1;
        this.name = createFinanceDto.name;
        this.categoryId = createFinanceDto.categoryId;
        this.walletId = createFinanceDto.walletId;
        this.type = createFinanceDto.type;
        this.isPaid = createFinanceDto.isPaid;
        this.value = getPipeMoneyNumber(createFinanceDto.money);
        this.paidAt = createFinanceDto.paid;
        this.createdAt = getPipeDateTimeString();
    }
}

class FinanceService implements Services<FinanceEntity, FinanceDto>{
    public async find(): Promise<FinanceEntity[]> {
        const finances = await AsyncStorage.getItem(ASYNC_FINANCES);
        if (finances) return JSON.parse(finances);
        return [];
    }

    public async findOne(id: number): Promise<FinanceEntity | undefined> {
        const finances = await this.find();
        return finances.find(finance => finance.id == id);
    }

    public async create(createDto: FinanceDto): Promise<FinanceEntity> {
        const finances = await this.find();
        const lastFinance = this.findLast(finances);

        const finance = new Finance(createDto, lastFinance?.id ?? 0);
        finances.push(finance);

        await AsyncStorage.setItem(ASYNC_FINANCES, JSON.stringify(finances));
        return finance;
    }

    public async update(updateDto: FinanceDto): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async getFinancesBalance(month: string, year: string, walletId: number): Promise<FinanceBalance> {
        let total = 0;
        let totalIncome = 0;
        let totalExpense = 0;

        if (!month || !year || !walletId) return {
            total,
            totalIncome,
            totalExpense,
            finances: []
        }

        const finances = await this.find();
        const categories = await AppCategoryService.find()

        const financesFilter = finances.map((finance) => {
            const [date] = finance.paidAt.split(" ");
            const [getYear, getMonth] = date.split("-");
            
            if(month.length == 1) month = month.padStart(2, "0")
            const validateDate = getYear == year && getMonth == month;

            if (finance.walletId == walletId && validateDate && finance.isPaid == true) {
                if (finance.type == "INCOME") {
                    total += finance.value;
                    totalIncome += finance.value;
                }
                if (finance.type == "EXPENSE") {
                    total -= finance.value;
                    totalExpense += finance.value;
                }

                const category = categories.find(c => c.id == finance.categoryId);

                return { ...finance, category };
            }
        }).filter(item => item) as FinancesBalanceEntity[];

        return {
            total,
            totalIncome,
            totalExpense,
            finances: financesFilter.sort((a, b) => b.id - a.id)
        }
    }

    public async getFinancesBalancePerCategory(month: string, year: string, walletId: number): Promise<FinanceBalance & { categories: FinanceBalancePerCategory[] }> {
        const balances = await this.getFinancesBalance(month, year, walletId);
        const perCategory: FinanceBalancePerCategory[] = [];

        for (const balance of balances.finances) {
            const category = perCategory.find(category => category?.category?.id == balance.categoryId);
            if (category?.total) {
                category.total += balance.value;
                continue
            }

            perCategory.push({
                category: balance.category,
                total: balance.value
            })
        }

        return { ...balances, categories: perCategory }
    }

    protected findLast(finances: FinanceEntity[]): FinanceEntity | undefined {
        return finances[finances.length - 1];
    }
}

export const AppFinanceService = new FinanceService()