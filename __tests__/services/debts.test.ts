import { AsyncMock } from "../../src/constants/storage.constant";
import { DebtsDto } from "../../src/interfaces/services/debts.interface";
import { AppDebtsService } from "../../src/services/debts";

const debt: DebtsDto = { total: 100, totalPerMonth: 10, paidMonthAt: "11-10", type: "INVOICE", institution: { name: "NUBANK", color: "#FFF", logo: "" } }
const sameDebt = AsyncMock['ASYNC_DEBTS'][0];

describe("services/debt", () => {
    describe("method find", () => {
        it("find debts and result must be DebtsDto array", async () => {
            const debts = await AppDebtsService.find();
            expect(debts).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ ...sameDebt, id: 1 })
                ])
            )
        })
    });

    describe("method findOne", () => {
        it("find where id = 1 result must be DebtsDto", async () => {
            const debt = await AppDebtsService.findOne(1);
            expect(debt).toEqual({ ...sameDebt, id: 1 })
        })

        it("find where id = 2 result must be undefined", async () => {
            const debt = await AppDebtsService.findOne(2);
            expect(debt).toBeUndefined()
        })
    });

    describe("method create", () => {
        it("create new debt and result must be { id: 2, ...debt }", async () => {
            const newDebt = await AppDebtsService.create(debt);

            expect(newDebt.id).toEqual(2);
            expect(newDebt.total).toEqual(100);
            expect(newDebt.totalPerMonth).toEqual(10);
            expect(newDebt.institution).toEqual({ name: "NUBANK", color: "#FFF", logo: "" });
            expect(newDebt.institutionName).toBeUndefined();
            expect(newDebt.paidMonthAt).toEqual("11-10");
            expect(newDebt.type).toEqual("INVOICE");
        })
    });

    describe("method delete", () => {
        it("id 1", async () => {
            const debts = await AppDebtsService.delete(1);
            expect(debts.length).toBe(0);
        })
    })
})