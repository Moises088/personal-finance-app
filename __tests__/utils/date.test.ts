import { getPipeDateString } from "../../src/utils/date.util";

describe("utils/date", () => {
    it("date number 1668132564359 result must be '2022-11-10 23:09:24'", () => {
        const date = 1668132564359;
        expect(getPipeDateString(date)).toEqual('2022-11-10 23:09:24');
    })
})