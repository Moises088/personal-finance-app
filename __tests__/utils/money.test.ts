import { getPipeMoneyNumber } from "../../src/utils/money.util";

describe("utils/money", () => {
    it("money number '10,00' result must be 10.00", () => {
        const money = '10,00';
        expect(getPipeMoneyNumber(money)).toEqual(10.00);
    })
    it("money number '10,14878' result must be 10.15", () => {
        const money = '10,14878';
        expect(getPipeMoneyNumber(money)).toEqual(10.15);
    })
    it("money number 'R$10,14' result must be 10.14", () => {
        const money = '10,14';
        expect(getPipeMoneyNumber(money)).toEqual(10.14);
    })
})