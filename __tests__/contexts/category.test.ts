import { CategoryEntity } from "../../src/interfaces/services/category.interface";
import { AppCategoryService } from "../../src/services/category";

const mockCategories: CategoryEntity[] = [
    { name: 'Bike', color: '#d44', icon: 'biking', id: 1 }
]

describe("services/category", () => {
    describe("method create", () => {
        it("create new category and result must be { id: 2, name: 'Academia', color: '#3f93eb', icon: 'dumbbel' }", async () => {
            const category: CategoryEntity = { color: "#3f93eb", icon: "dumbbel", name: "Academia" }
            const newCategory = AppCategoryService.onCreateCategory(mockCategories, category);
            expect(newCategory.category).toEqual({ id: 2, name: 'Academia', color: '#3f93eb', icon: 'dumbbel' })
        })

        it("create same category and result must be Error 'Categoria já criada'", async () => {
            try {
                const category: CategoryEntity = { name: 'Bike', color: '#d44', icon: 'biking' }
                expect(AppCategoryService.onCreateCategory(mockCategories, category)).toThrow(Error('Categoria já criada'));
            } catch (error) { }
        })
    })
})