import { BudgetDto } from "../../src/interfaces/services/budget.interface";
import { AppBudgetService } from "../../src/services/budget";
import { AsyncMock } from "../../__mocks__/asynstorage.mock";

const budget: BudgetDto = { month: "12", year: "2022", total: "10,50", categories: [{ categoryId: 1, total: 10 }] };
const sameBudget = AsyncMock['ASYNC_BUDGETS'][0];

describe("services/budget", () => {
    describe("method find", () => {
        it("find budgets and result must be BudgetDto array", async () => {
            const budgets = await AppBudgetService.find();
            expect(budgets).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ ...sameBudget, id: 1 })
                ])
            )
        })
    })

    describe("method findOne", () => {
        it("find where id = 1 result must be BudgetDto", async () => {
            const budget = await AppBudgetService.findOne(1);
            expect(budget).toEqual({ ...sameBudget, id: 1 })
        })

        it("find where id = 2 result must be undefined", async () => {
            const budget = await AppBudgetService.findOne(2);
            expect(budget).toBeUndefined()
        })
    })

    describe("method create", () => {
        it("create new budget and result must be { id: 2, ...budget }", async () => {
            const newBudget = await AppBudgetService.create(budget);

            expect(newBudget.id).toEqual(2);
            expect(newBudget.categories.length).toEqual(1);
            expect(newBudget.categories).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ categoryId: 1, total: 10 })
                ])
            )
            expect(newBudget.month).toEqual("12");
            expect(newBudget.year).toEqual("2022");
            expect(newBudget.value).toEqual(10.5);
        })

        it("create same budget and result must be Error 'Orçamento já criado'", async () => {
            const budget: BudgetDto = { month: "11", year: "2022", total: "10,50", categories: [{ categoryId: 1, total: 10 }] };
            AppBudgetService.create(budget).catch(error => {
                expect(error).toThrow(Error('Orçamento já criado'));
            });
        })
    })
})