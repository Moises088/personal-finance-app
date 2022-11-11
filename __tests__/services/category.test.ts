import { CategoryDto } from "../../src/interfaces/services/category.interface";
import { AppCategoryService } from "../../src/services/category";

describe("services/category", () => {
    describe("method create", () => {
        it("create new category and result must be { id: 2, name: 'Academia', color: '#3f93eb', icon: 'dumbbel' }", async () => {
            const category: CategoryDto = { color: "#3f93eb", icon: "dumbbel", name: "Academia" }
            const newCategory = await AppCategoryService.create(category);
            expect(newCategory).toEqual({ id: 2, name: 'Academia', color: '#3f93eb', icon: 'dumbbel' })
        })

        it("create same category and result must be Error 'Categoria já criada'", async () => {
            const category: CategoryDto = { name: 'Bike', color: '#d44', icon: 'biking' }
            AppCategoryService.create(category).catch(error => {
                expect(error).toThrow(Error('Categoria já criada'));
            })
        })
    })
})