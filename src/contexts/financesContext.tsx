import React, { createContext } from "react";
import Loading from "../components/global/loading";
import { FinancesContextData } from "../interfaces/screens/finance.interface";
import { FinanceBalance } from "../interfaces/services/finance.interface";
import { AppBalanceService } from "../services/balance";
import { AppFinanceService } from "../services/finance";

export const FinancesContext = createContext<FinancesContextData>({} as FinancesContextData);

export const FinancesProvider = ({ children }: any) => {

    const [filteredMonth, setFilteredMonth] = React.useState<string>('')
    const [filteredYear, setFilteredYear] = React.useState<string>('')
    const [finances, setFinances] = React.useState<FinanceBalance>();
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        getFinancesBalance()
    }, [filteredMonth, filteredYear])

    const getFinancesBalance = async () => {
        try {
            setLoading(true)
            const financesBalance = await AppBalanceService.getFinancesBalance(filteredMonth, filteredYear, 1);
            setFinances(financesBalance)
            return financesBalance;
        } catch (error) { } finally {
            setLoading(false)
        }
    }

    const deleteFinance = async (id: number) => {
        try {
            await AppFinanceService.delete(id);
            await getFinancesBalance()
        } catch (error) { } finally {
            setLoading(false)
        }
    }

    return (
        <FinancesContext.Provider value={{
            filteredMonth,
            filteredYear,
            finances,
            setFilteredMonth,
            setFilteredYear,
            getFinancesBalance,
            deleteFinance
        }}>
            <Loading visible={loading} />
            {children}
        </FinancesContext.Provider>
    );
}

export default FinancesProvider;
