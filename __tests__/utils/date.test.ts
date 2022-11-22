import { getPipeCustomDateString, getPipeDateTimeString, getPipeTransformDateStringNumber, getPipeTransformDateStringPT, validateDateString } from "../../src/utils/date.util";

describe("utils/date", () => {
    it("getPipeDateTimeString date number 1668132564359 result must be '2022-11-10 23:09:24'", () => {
        const date = 1668132564359;
        expect(getPipeDateTimeString(date)).toEqual('2022-11-10 23:09:24');
    })

    it("getPipeDateTimeString date number 1668132564359 result must be '2022-11-10 00:00:00'", () => {
        const date = 1668132564359;
        expect(getPipeDateTimeString(date, false)).toEqual('2022-11-10');
    })

    it("getPipeCustomDateString date number 1668132564359 result must be '10/11/2022'", () => {
        const date = 1668132564359;
        expect(getPipeCustomDateString(date, "DD/MM/YYYY")).toEqual('10/11/2022');
    })

    it("getPipeTransformDateStringPT date string '10/11/2022' result must be '2022-11-10'", () => {
        const date = '10/11/2022';
        expect(getPipeTransformDateStringPT(date)).toEqual('2022-11-10');
    })

    it("validateDateString date string '2022-11-10' result must be empty array", () => {
        const date = '2022-11-10';
        expect(validateDateString(date).length).toBe(0);
    })
    
    it("validateDateString date string '9999-11-10' result must be array length 1", () => {
        const date = '9999-11-10';
        expect(validateDateString(date).length).toBe(1);
    })

    it("validateDateString date string '9999-99-10' result must be array length 2", () => {
        const date = '9999-99-10';
        expect(validateDateString(date).length).toBe(2);
    })

    it("validateDateString date string '9999-99-99' result must be array length 3", () => {
        const date = '9999-99-99';
        expect(validateDateString(date).length).toBe(3);
    })

    it("validateDateString date string '10/11/2022' result must be '2022-11-10 00:00:00'", () => {
        const date = '10/11/2022';
        expect(getPipeTransformDateStringNumber(date)).toBe('2022-11-10 00:00:00');
    })
})