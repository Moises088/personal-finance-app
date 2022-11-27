import { ASYNC_CATEGORIES } from '../constants/storage.constant';
import { CategoryDto, CategoryEntity } from '../interfaces/services/category.interface';
import { Services } from '../interfaces/services/service.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Category implements CategoryEntity {
    public id: number;
    public name: string;
    public color: string;
    public icon: string;

    constructor(id: number, name: string, color: string, icon: string) {
        this.id = id + 1;
        this.name = name;
        this.color = color;
        this.icon = icon;
    }
}

class CategoryService implements Services<CategoryEntity, CategoryDto> {
    public async find(): Promise<CategoryEntity[]> {
        const categories = await AsyncStorage.getItem(ASYNC_CATEGORIES);
        return JSON.parse(categories ?? JSON.stringify([]));
    }

    public async findOne(id: number): Promise<CategoryEntity | undefined> {
        const categories = await this.find();
        return categories.find(category => category.id == id);
    }

    protected findLast(categories: CategoryEntity[]): CategoryEntity | undefined {
        return categories[categories.length - 1];
    }

    public async create({ name, color, icon }: CategoryDto): Promise<CategoryEntity> {
        const categories = await this.find();

        const filter = categories.filter(category => category.name == name);
        if (filter.length) throw new Error('Categoria já criada');

        const lastCategory = this.findLast(categories);
        const category = new Category(lastCategory?.id ?? 0, name, color, icon);
        categories.push(category);

        await AsyncStorage.setItem(ASYNC_CATEGORIES, JSON.stringify(categories));

        return category;
    }

    public async update(id: number, updateDto: CategoryEntity): Promise<CategoryEntity | undefined> {
        return
    }

    public async delete(id: number): Promise<CategoryEntity[]> {
        return []
    }
}

export const AppCategoryService = new CategoryService()