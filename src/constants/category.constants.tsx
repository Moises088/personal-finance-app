import { CategoriesList } from "../types/screens/category.type";
import { Feather } from '@expo/vector-icons';

export const CATEGORIES_LIST: CategoriesList[] = [
    {
        label: 'Casa',
        icon: (size) => <Feather name="home" size={size} color="#FFF" />,
        background: "#540f99"
    }
];

export const getCategoryIcon = (label: string) => {
    return CATEGORIES_LIST.find(category => category.label == label)
}