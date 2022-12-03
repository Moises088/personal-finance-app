import React, { createContext } from "react";
import Loading from "../components/global/loading";
import { DebtsContextData } from "../interfaces/screens/debts.interface";
import { DebtsBalance } from "../interfaces/services/debts.interface";
import { AppDebtsService } from "../services/debts";

export const DebtsContext = createContext<DebtsContextData>({} as DebtsContextData);

export const DebtsProvider = ({ children }: any) => {

    const [debts, setDebts] = React.useState<DebtsBalance[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        getDebtsBalance()
    }, [])

    const getDebtsBalance = async () => {
        try {
            setLoading(true)
            const debtsBalance = await AppDebtsService.getDebtsBalance();
            setDebts(debtsBalance)
            return debtsBalance;
        } catch (error) { } finally {
            setLoading(false)
        }
    }

    const deleteDebt = async (id: number) => {
        try {
            // await AppDebtService.delete(id);
            // await getDebtsBalance()
        } catch (error) { } finally {
            setLoading(false)
        }
    }

    return (
        <DebtsContext.Provider value={{ debts, getDebtsBalance, deleteDebt }}>
            <Loading visible={loading} />
            {children}
        </DebtsContext.Provider>
    );
}

export default DebtsProvider;
