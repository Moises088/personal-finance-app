import React from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';

const CategoryItem: React.FC = () => {

    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);
  
    return (
        <View style={style.container}>
            <Text>Icon</Text>
        </View>
    )
}
export default CategoryItem;