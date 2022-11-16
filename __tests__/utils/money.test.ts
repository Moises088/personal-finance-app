import { getPipeMoneyNumber, getPipeMoneyString } from "../../src/utils/money.util";

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
        const money = 'R$10,14';
        expect(getPipeMoneyNumber(money)).toEqual(10.14);
    })
    it("money number 'R$0,1488' result must be 0.15", () => {
        const money = 'R$0,1488';
        expect(getPipeMoneyNumber(money)).toEqual(0.15);
    })
    it("money number 'R$0,1448' result must be 0.14", () => {
        const money = 'R$0,1448';
        expect(getPipeMoneyNumber(money)).toEqual(0.14);
    })
    it("money number 10.3 result must be '10,30'", () => {
        const money = 10.3;
        expect(getPipeMoneyString(money)).toEqual("10,30");
    })
    it("money undefined result must be '0,00'", () => {
        expect(getPipeMoneyString(undefined)).toEqual("0,00");
    })
})