import { FinanceDto } from "../../src/interfaces/services/finance.interface";
import { AppFinanceService } from "../../src/services/finance";

describe("services/finance", () => {
    describe("method create", () => {
        it("create new finance", async () => {
            const finance: FinanceDto = {
                categoryId: 1,
                walletId: 1,
                isPaid: true,
                name: 'Conta',
                paid: 1668132564359,
                money: "R$20.50"
            }
            const newfinance = await AppFinanceService.create(finance);
            expect(newfinance.id).toEqual(2);
            expect(newfinance.value).toEqual(20.50);
            expect(typeof newfinance.value).toBe('number');
            expect(typeof newfinance.createdAt).toBe('string');
            expect(newfinance.paidAt).toBe('2022-11-10 23:09:24');
        })
    })
})