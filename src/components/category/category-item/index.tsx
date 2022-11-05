import React from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { CategoryEntity } from '../../../interfaces/services/category.interface';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';

const CategoryItem: React.FC<{ item: CategoryEntity }> = ({ item }) => {

    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    return (
        <View style={style.container}>
            <View style={style.containerRow}>
                <View style={[style.containerIcon, { backgroundColor: item.color }]}>
                    <FontAwesome5 name={item.icon} size={16} color={theme.text.primary} />
                </View>
                <Text style={style.name}>{item.name}</Text>
            </View>
        </View>
    )
}
export default CategoryItem;