import { DebtsBalance } from "../services/debts.interface";

export interface DebtsContextData {
    debts: DebtsBalance[],
    getDebtsBalance: () => void,
    deleteDebt: (id: number) => void
}

export type DebtsParamRoute = {
    Detail: {
        debts?: DebtsBalance
    };
}