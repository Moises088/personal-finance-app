import { CategoryDto } from "../../src/interfaces/services/category.interface";
import { AppCategoryService } from "../../src/services/category";
import { AsyncMock } from "../../__mocks__/asynstorage.mock";

const category: CategoryDto = { color: "#3f93eb", icon: "dumbbel", name: "Academia" }
const sameCategory: CategoryDto = AsyncMock['ASYNC_CATEGORIES'][0];

describe("services/category", () => {
    describe("method find", () => {
        it("find categories and result must be CategoryDto array", async () => {
            const categories = await AppCategoryService.find();
            expect(categories).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ ...sameCategory, id: 1 })
                ])
            )
        })
    })

    describe("method findOne", () => {
        it("find where id = 1 result must be CategoryDto", async () => {
            const category = await AppCategoryService.findOne(1);
            expect(category).toEqual({ ...sameCategory, id: 1 })
        })

        it("find where id = 2 result must be undefined", async () => {
            const category = await AppCategoryService.findOne(2);
            expect(category).toBeUndefined()
        })
    })

    describe("method create", () => {
        it("create new category and result must be { id: 2, name: 'Academia', color: '#3f93eb', icon: 'dumbbel' }", async () => {
            const newCategory = await AppCategoryService.create(category);
            expect(newCategory).toEqual({ id: 2, ...category })
        })

        it("create same category and result must be Error 'Categoria já criada'", async () => {
            AppCategoryService.create(sameCategory).catch(error => {
                expect(error).toThrow(Error('Categoria já criada'));
            })
        })
    })
})