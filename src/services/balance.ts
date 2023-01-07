import { DEBTS_INSTITUTION } from "../constants/debts.constants";
import { DebtsBalance, DebtsInstitution } from "../interfaces/services/debts.interface";
import { FinanceBalance, FinanceBalancePerCategory, FinancesBalanceEntity } from "../interfaces/services/finance.interface";
import { decontextualize } from "../utils/data.util";
import { AppCategoryService } from "./category";
import { AppDebtsService } from "./debts";
import { AppFinanceService } from "./finance";

class BalanceService {
    public async getDebtsBalance(): Promise<DebtsBalance[]> {
        const finances = await AppFinanceService.find();
        const categories = await AppCategoryService.find();
        const debts = await AppDebtsService.find();

        const debtsBalance: DebtsBalance[] = []

        for (const debt of debts) {
            if (!debt.totalPerMonth) debt.totalPerMonth = debt.total
            const institution = DEBTS_INSTITUTION.find(institution => institution.id == debt.institutionId) as DebtsInstitution;

            const financesFilter = finances.map(finance => {
                if (finance.billId == debt.id && finance.isPaid) {
                    const category = categories.find(category => category.id == finance.categoryId);
                    const bill = DEBTS_INSTITUTION.find(institution => institution.id == debt.institutionId)
                    return { ...finance, category, bill }
                }
            }).filter(r => r) as FinancesBalanceEntity[];

            let totalPaid = 0;
            financesFilter.map(finance => { if (finance.type == "EXPENSE") totalPaid += finance.value })

            const getTotalMonth = () => {
                if ((debt.total - totalPaid) > 0) return Math.ceil((debt.total - totalPaid) / debt.totalPerMonth)
                return 0
            }

            let totalRemain = 0;
            if ((debt.total - totalPaid) > 0) totalRemain = debt.total - totalPaid;

            const totalMonth = getTotalMonth()

            debtsBalance.push({
                ...debt,
                totalMonth,
                institution,
                finances: financesFilter,
                totalPaid,
                totalRemain
            })
        }

        return debtsBalance
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

        const finances = await AppFinanceService.find();
        const categories = await AppCategoryService.find()
        const bills = await AppDebtsService.find()

        const financesFilter = finances.map((finance) => {
            const [date] = finance.paidAt.split(" ");
            const [getYear, getMonth] = date.split("-");

            if (month.length == 1) month = month.padStart(2, "0")
            const validateDate = getYear == year && getMonth == month;

            if (finance.walletId == walletId && validateDate) {
                if (finance.isPaid) {
                    if (finance.type == "INCOME") {
                        total += finance.value;
                        totalIncome += finance.value;
                    }
                    if (finance.type == "EXPENSE") {
                        total -= finance.value;
                        totalExpense += finance.value;
                    }
                }

                const category = categories.find(c => c.id == finance.categoryId);
                const getBill = bills.find(bill => bill.id == finance.billId);
                const getInstitution = DEBTS_INSTITUTION.find(bill => bill.id == getBill?.institutionId);

                let bill;
                if (getInstitution) {
                    bill = decontextualize<DebtsInstitution>(getInstitution);
                    if (bill.name == "OUTRO") bill.name = getBill?.institutionName ?? "";
                }

                return { ...finance, category, bill };
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
            if (balance.categoryId) {
                const category = perCategory.find(category => category?.category?.id == balance.categoryId);
                if (category?.total) {
                    category.total += balance.value;
                    continue
                }

                perCategory.push({
                    bill: undefined,
                    category: balance.category,
                    total: balance.value
                })
            }

            if (balance.billId) {
                const bill = perCategory.find(bill => bill.bill?.id == balance.billId);
                if (bill?.total) {
                    bill.total += balance.value;
                    continue
                }

                perCategory.push({
                    bill: { institution: balance.bill, id: balance.billId },
                    category: undefined,
                    total: balance.value
                })
            }
        }

        return { ...balances, categories: perCategory }
    }
}

export const AppBalanceService = new BalanceService()