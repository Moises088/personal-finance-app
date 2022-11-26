import React, { createContext } from "react";
import { BudgetsContextData } from "../interfaces/screens/budget.interface";
import { BudgetsBalanceEntity } from "../interfaces/services/budget.interface";
import { AppBudgetService } from "../services/budget";
import { FinancesContext } from "./financesContext";

export const BudgetsContext = createContext<BudgetsContextData>({} as BudgetsContextData);

export const BudgetsProvider = ({ children }: any) => {

    const { filteredMonth, filteredYear } = React.useContext(FinancesContext)
    const [budgets, setBudgets] = React.useState<BudgetsBalanceEntity>();

    React.useEffect(() => {
        getBudgetsBalance()
    }, [filteredMonth, filteredYear])

    const getBudgetsBalance = async () => {
        const budgetsBalance = await AppBudgetService.getBudgetBalance(filteredMonth, filteredYear);
        setBudgets(budgetsBalance)
        return budgetsBalance;
    }

    return (
        <BudgetsContext.Provider value={{ budgets, getBudgetsBalance }}>
            {children}
        </BudgetsContext.Provider>
    );
}

export default BudgetsProvider;
