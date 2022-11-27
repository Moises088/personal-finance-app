import React, { createContext } from "react";
import Loading from "../components/global/loading";
import { BudgetsContextData } from "../interfaces/screens/budget.interface";
import { BudgetsBalanceEntity } from "../interfaces/services/budget.interface";
import { AppBudgetService } from "../services/budget";
import { FinancesContext } from "./financesContext";

export const BudgetsContext = createContext<BudgetsContextData>({} as BudgetsContextData);

export const BudgetsProvider = ({ children }: any) => {

    const { filteredMonth, filteredYear } = React.useContext(FinancesContext)
    const [budgets, setBudgets] = React.useState<BudgetsBalanceEntity>();
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        getBudgetsBalance()
    }, [filteredMonth, filteredYear])

    const getBudgetsBalance = async () => {
        try {
            setLoading(true)
            const budgetsBalance = await AppBudgetService.getBudgetBalance(filteredMonth, filteredYear);
            setBudgets(budgetsBalance)
            return budgetsBalance;
        } catch (error) { } finally {
            setLoading(false)
        }
    }

    const deleteBudget = async (id: number) => {
        try {
            await AppBudgetService.delete(id);
            await getBudgetsBalance()
        } catch (error) { } finally {
            setLoading(false)
        }
    }

    return (
        <BudgetsContext.Provider value={{ budgets, getBudgetsBalance, deleteBudget }}>
            <Loading visible={loading} />
            {children}
        </BudgetsContext.Provider>
    );
}

export default BudgetsProvider;
