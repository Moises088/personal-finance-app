import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { COLOR_SUCCESS } from '../../../constants/colors';
import { ThemeContext } from '../../../contexts/themeContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';
import { IconProps } from '../../../interfaces/screens/icon.interface';

const SelectIcon: React.FC<IconProps> = (props) => {
    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    const icons: string[] = [
        "book", "hand-holding-water", "dollar-sign", "dribbble", "gift", "home", "wifi",
        "heart", "hand-holding-usd", "key","map", "lightbulb", "shopping-cart", "truck", 
        "user", "car", "plane", "hotel", "credit-card","suitcase", "phone", "stethoscope", 
        "gas-pump", "android", "apple", "baby-carriage", "birthday-cake","bitcoin", "bone", 
        "bus", "car-crash", "cat", "wallet", "code", "coins", "couch", "dumbbell", "amazon",
        "baby", "biking"
    ];
    const [borderActive, setBorderActive] = React.useState<string>('');

    React.useEffect(() => {
        if (props.selectedIcon) setBorderActive(props.selectedIcon)
    }, [])

    const setIcon = async (icon: string) => {
        setBorderActive(icon);
        props.setIcon(icon);
    }

    const iconItem = (icon: string) => {
        return (
            <TouchableOpacity onPress={() => setIcon(icon)}>
                <View style={[
                    style.containerIcon,
                    { borderColor: borderActive == icon ? COLOR_SUCCESS : theme.background.tertiary }
                ]}>
                    <FontAwesome5 name={icon} size={18} color={theme.text.primary} />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={style.container}>
            <FlatList
                columnWrapperStyle={{ justifyContent: "space-between" }}
                data={icons}
                renderItem={({ item }) => iconItem(item)}
                numColumns={5}
            />
        </View>
    );
}

export default SelectIcon;