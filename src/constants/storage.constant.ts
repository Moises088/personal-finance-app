import { MockProps } from "../interfaces/mock/asyncMock.interface";

export const ASYNC_IS_LOGGED = "ASYNC_IS_LOGGED";
export const ASYNC_CATEGORIES = "ASYNC_CATEGORIES";
export const ASYNC_WALLETS = "ASYNC_WALLETS";
export const ASYNC_FINANCES = "ASYNC_FINANCES";
export const ASYNC_BUDGETS = "ASYNC_BUDGETS";
export const ASYNC_DEBTS = "ASYNC_DEBTS";

export const AsyncMock: MockProps = {
    ASYNC_CATEGORIES: [
        { id: 1, name: 'Bike', color: '#d44', icon: 'biking' }
    ],
    ASYNC_WALLETS: [
        { name: 'Principal', id: 1 }
    ],
    ASYNC_FINANCES: [
        { id: 1, categoryId: 1, walletId: 1, createdAt: '2022-11-10 00:00:00', isPaid: true, name: 'Conta', paidAt: '2022-11-10 00:00:00', value: 20.00, type: 'EXPENSE' },
        { id: 2, categoryId: 1, walletId: 1, createdAt: '2022-11-11 00:00:00', isPaid: true, name: 'Conta1', paidAt: '2022-11-11 00:00:00', value: 10.00, type: 'INCOME' },
    ],
    ASYNC_BUDGETS: [
        { id: 1, month: "11", year: "2022", value: 100.50, createdAt: "2022-11-10 00:00:00", categories: [{ categoryId: 1, total: 10 }, { categoryId: 2, total: 90.50 }] }
    ],
    ASYNC_DEBTS: [
        { id: 1, total: 1000, totalPerMonth: 100, paidMonthAt: "11-10", type: "INVOICE", institution: { name: "NUBANK", color: "#FFF", logo: "" }, createdAt: '2022-11-11 00:00:00' }
    ]
}