import { AsyncMock } from "../../src/constants/storage.constant";
import { FinanceDto } from "../../src/interfaces/services/finance.interface";
import { AppFinanceService } from "../../src/services/finance";
import { getPipeTransformDateStringNumber, getPipeTransformDateStringPT } from "../../src/utils/date.util";

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

        it("find where id = 3 result must be undefined", async () => {
            const finance = await AppFinanceService.findOne(3);
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
            expect(newfinance.id).toEqual(3);
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

    describe("method update", () => {
        const body: FinanceDto = {
            categoryId: 2,
            isPaid: false,
            walletId: 1,
            money: "1.050,25",
            name: "Updated",
            paid: "2022-27-11 00:00:00",
            type: "INCOME",
            description: "Test"
        }

        it("update id 1", async () => {
            const financeUpdated = await AppFinanceService.update(1, body);
            expect(financeUpdated?.categoryId).toEqual(2);
            expect(financeUpdated?.isPaid).toEqual(false);
            expect(financeUpdated?.walletId).toEqual(1);
            expect(financeUpdated?.value).toEqual(1050.25);
            expect(financeUpdated?.paidAt).toEqual("2022-27-11 00:00:00");
            expect(financeUpdated?.type).toEqual("INCOME");
            expect(financeUpdated?.description).toEqual("Test");
        })

        it("update id 3", async () => {
            const financeUpdated = await AppFinanceService.update(3, body);
            expect(financeUpdated).toBeUndefined();
        })
    })

    describe("method delete", () => {
        it("id 1", async () => {
            const finances = await AppFinanceService.delete(1);
            expect(finances.length).toBe(1);
        })
    })
})