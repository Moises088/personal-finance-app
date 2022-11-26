import { FinanceDto } from "../../src/interfaces/services/finance.interface";
import { AppFinanceService } from "../../src/services/finance";
import { getPipeTransformDateStringNumber, getPipeTransformDateStringPT } from "../../src/utils/date.util";
import { AsyncMock } from "../../__mocks__/asynstorage.mock";

const sameFinance = AsyncMock['ASYNC_FINANCES'][0];

describe("services/finance", () => {
    describe("method find", () => {
        it("find finances and result must be Finance array", async () => {
            const finances = await AppFinanceService.find();
            expect(finances).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ ...sameFinance, id: 1 })
                ])
            )
        })
    })

    describe("method findOne", () => {
        it("find where id = 1 result must be Finance", async () => {
            const finance = await AppFinanceService.findOne(1);
            expect(finance).toEqual({ ...sameFinance, id: 1 })
        })

        it("find where id = 2 result must be undefined", async () => {
            const finance = await AppFinanceService.findOne(2);
            expect(finance).toBeUndefined()
        })
    })

    describe("method create", () => {
        it("create new finance", async () => {
            const finance: FinanceDto = {
                categoryId: 1,
                walletId: 1,
                isPaid: true,
                name: 'Conta',
                paid: getPipeTransformDateStringNumber('10/11/2022'),
                money: "R$20,50",
                type: 'INCOME'
            }
            const newfinance = await AppFinanceService.create(finance);
            expect(newfinance.id).toEqual(2);
            expect(newfinance.value).toEqual(20.50);
            expect(typeof newfinance.value).toBe('number');
            expect(typeof newfinance.createdAt).toBe('string');
            expect(newfinance.paidAt).toBe('2022-11-10 00:00:00');
        })
    })

    describe("method getFinancesBalance", () => {
        it("get balance nov 2022", async () => {
            const balance = await AppFinanceService.getFinancesBalance('11', '2022', 1);
            expect(balance.total).toEqual(-10);
            expect(balance.totalExpense).toEqual(20);
            expect(balance.totalIncome).toEqual(10);
            expect(balance.finances).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(sameFinance)
                ])
            )
        })

        it("get balance withou params", async () => {
            const balance = await AppFinanceService.getFinancesBalance('', '', 0);
            expect(balance.total).toEqual(0);
            expect(balance.totalExpense).toEqual(0);
            expect(balance.totalIncome).toEqual(0);
            expect(balance.finances.length).toEqual(0)
        })
    })
})