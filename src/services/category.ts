import { ASYNC_CATEGORIES } from '../constants/storage.constant';
import { CategoryEntity } from '../interfaces/services/category.interface';
import { Services } from '../interfaces/services/service.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Category implements CategoryEntity {
    public id: number;
    public name: string;
    public color: string;
    public icon: string;

    constructor(id: number, name: string, color: string, icon: string) {
        this.id = id++;
        this.name = name;
        this.color = color;
        this.icon = icon;
    }
}

class CategoryService implements Services<CategoryEntity> {
    public async find(): Promise<CategoryEntity[]> {
        const categories = await AsyncStorage.getItem(ASYNC_CATEGORIES);
        if (categories) return JSON.parse(categories);
        return [];
    }

    public async findOne(id: number): Promise<CategoryEntity | undefined> {
        const categories = await this.find();
        return categories.find(category => category.id == id);
    }

    protected findLast(categories: CategoryEntity[]): CategoryEntity | undefined {
        return categories[categories.length - 1];
    }

    public async create({ name, color, icon }: CategoryEntity): Promise<void> {
        const categories = await this.find();

        const filter = categories.filter(category => category.name == name);
        if (filter.length) throw new Error('Categoria já criada')

        const lastCategory = this.findLast(categories);
        const category = new Category(lastCategory?.id ?? 0, name, color, icon);
        categories.push(category);

        await AsyncStorage.setItem(ASYNC_CATEGORIES, JSON.stringify(categories))
    }

    public async update(updateDto: CategoryEntity): Promise<void> {
        return
    }

}

export const AppCategoryService = new CategoryService()