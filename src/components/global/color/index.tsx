import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { COLOR_SUCCESS } from '../../../constants/colors';
import { ThemeContext } from '../../../contexts/themeContext';
import { ColorProps } from '../../../interfaces/screens/color.interface';
import { styles } from './styles';

const SelectColor: React.FC<ColorProps> = (props) => {
    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    const colors: string[] = [
        "#420101", "#6e0202", "#a30202", "#fc0303", "#fa6966",
        "#5c2201", "#823001", "#ab3f02", "#ff5e03", "#fca868",
        "#424101", "#8a7f03", "#a19e00", "#fcf803", "#faf743",
        "#022e01", "#045c02", "#058f01", "#08d902", "#41fa3c",
        "#020142", "#04188a", "#0539b3", "#126bc9", "#3f93eb",
        "#3c013d", "#640266", "#940396", "#d802db", "#fa5bfc"
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