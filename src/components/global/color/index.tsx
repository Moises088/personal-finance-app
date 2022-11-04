import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { COLOR_SUCCESS } from '../../../constants/colors';
import { ThemeContext } from '../../../contexts/themeContext';
import { ColorProps } from '../../../types/screens/color.type';
import { styles } from './styles';

const SelectColor: React.FC<ColorProps> = (props) => {
    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    const colors: string[] = [
        "#540f99", "#21fc5f", "#850328", "#038a7c",
        "#8a1203", "#8a7f03", "#508a03", "#e5ed05",
        "#0588ed", "#d4020d"
    ];
    const [borderActive, setBorderActive] = React.useState<string>('');

    React.useEffect(() => {
        if(props.selectedColor) setBorderActive(props.selectedColor)
    }, [])

    const setColor = async (color: string) => {
        setBorderActive(color);
        await new Promise(resolve => setTimeout(resolve, 50));
        props.setColor(color);
    }

    const colorItem = (color: string) => {
        return (
            <TouchableOpacity onPress={() => setColor(color)}>
                <View style={[
                    style.containerIcon,
                    { borderColor: borderActive == color ? COLOR_SUCCESS : theme.background.tertiary, backgroundColor: color }
                ]}></View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={style.container}>
            <FlatList
                columnWrapperStyle={{ justifyContent: "space-between" }}
                data={colors}
                renderItem={({ item, index }) => colorItem(item)}
                numColumns={5}
            />
        </View>
    );
}

export default SelectColor;