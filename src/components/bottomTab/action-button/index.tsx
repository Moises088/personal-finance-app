import React from "react";
import { Animated, TouchableOpacity } from "react-native";
import { ActionButtonBottomTab } from "../../../interfaces/screens/bottom-tab.interface";
import { Entypo } from '@expo/vector-icons';
import { styles } from "./styles";
import { ThemeContext } from "../../../contexts/themeContext";

const BottomTabActionButton = (props: ActionButtonBottomTab) => {
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    const spinValue = React.useRef(new Animated.Value(0)).current
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg']
    })

    React.useEffect(() => {
        animateButton()
    }, [props.openMenu])

    const animateButton = () => {
        Animated.timing(spinValue, {
            toValue: !props.openMenu ? 0 : 1,
            duration: 150,
            useNativeDriver: true,
        }).start()
    }

    return (
        <AnimatedTouchable onPress={props.toggleMenu} style={[{ transform: [{ rotate: spin }] }, style.actionButton]} activeOpacity={0.96}>
            <Entypo name="plus" size={30} color="#FFF" />
        </AnimatedTouchable>
    )
}

export default BottomTabActionButton;