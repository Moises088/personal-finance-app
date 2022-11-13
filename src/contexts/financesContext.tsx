import React, { createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_IS_LOGGED } from "../constants/storage.constant";
import { FinancesContextData } from "../interfaces/screens/finance.interface";

export const FinancesContext = createContext<FinancesContextData>({} as FinancesContextData);

export const FinancesProvider = ({ children }: any) => {

    const [filteredMonth, setFilteredMonth] = React.useState<string>('')
    const [filteredYear, setFilteredYear] = React.useState<string>('')

    return (
        <FinancesContext.Provider value={{
            filteredMonth,
            filteredYear,
            setFilteredMonth,
            setFilteredYear
        }}>
            {children}
        </FinancesContext.Provider>
    );
}

export default FinancesProvider;
