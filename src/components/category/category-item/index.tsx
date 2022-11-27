import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { CategoryEntity } from '../../../interfaces/services/category.interface';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';

const CategoryItem: React.FC<{ item: CategoryEntity, selectItem(item: CategoryEntity): void }> = ({ item, selectItem }) => {

    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    return (
        <TouchableOpacity style={style.container} activeOpacity={0.9} onPress={() => selectItem(item)}>
            <View style={style.containerRow}>
                <View style={[style.containerIcon, { backgroundColor: item.color }]}>
                    <FontAwesome5 name={item.icon} size={16} color={theme.text.primary} />
                </View>
                <Text style={style.name}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default CategoryItem;