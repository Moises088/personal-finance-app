import React, { createContext } from "react";
import { FinancesContextData } from "../interfaces/screens/finance.interface";
import { FinanceBalance } from "../interfaces/services/finance.interface";
import { AppFinanceService } from "../services/finance";

export const FinancesContext = createContext<FinancesContextData>({} as FinancesContextData);

export const FinancesProvider = ({ children }: any) => {

    const [filteredMonth, setFilteredMonth] = React.useState<string>('')
    const [filteredYear, setFilteredYear] = React.useState<string>('')
    const [finances, setFinances] = React.useState<FinanceBalance>();

    React.useEffect(() => {
        getFinancesBalance()
    }, [filteredMonth, filteredYear])

    const getFinancesBalance = async () => {
        const financesBalance = await AppFinanceService.getFinancesBalance(filteredMonth, filteredYear, 1);
        setFinances(financesBalance)
        return financesBalance;
    }

    return (
        <FinancesContext.Provider value={{
            filteredMonth,
            filteredYear,
            finances,
            setFilteredMonth,
            setFilteredYear,
            getFinancesBalance
        }}>
            {children}
        </FinancesContext.Provider>
    );
}

export default FinancesProvider;
