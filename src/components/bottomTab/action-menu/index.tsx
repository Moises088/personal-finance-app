import React from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { ActionMenuBottomTab } from "../../../interfaces/bottom-tab.interface";
import { WINDOW_HEIGTH } from "../../../constants/screen.contants";
import styles from "./styles";

const BottomTabActionMenu = (props: ActionMenuBottomTab) => {

    const elementAddIncometranslateX = React.useRef(new Animated.Value(50)).current;
    const elementAddIncometranslateY = React.useRef(new Animated.Value(40)).current;
    const elementAddExpensetranslateX = React.useRef(new Animated.Value(-50)).current;

    const elementAddExpensetranslateY = React.useRef(new Animated.Value(40)).current;

    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    const [showMenu, setShowMenu] = React.useState<boolean>(props.openMenu);

    React.useEffect(() => {
        animateItens()
    }, [props.openMenu])

    const animateItens = () => {
        let timeout = showMenu ? 150 : 0;
        setTimeout(() => {
            setShowMenu(props.openMenu)
        }, timeout);

        Animated.parallel([
            Animated.timing(elementAddIncometranslateX, {
                toValue: !props.openMenu ? 50 : 0,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(elementAddIncometranslateY, {
                toValue: !props.openMenu ? 40 : 0,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(elementAddExpensetranslateX, {
                toValue: !props.openMenu ? -50 : 0,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(elementAddExpensetranslateY, {
                toValue: !props.openMenu ? 40 : 0,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start()
    }

    return showMenu ? (
        <View style={styles.backdrop} onTouchEnd={props.toggleMenu}>
            <View style={styles.container}>
                <AnimatedTouchable onPress={() => props.emitEvent("AddIncome")} style={[
                    styles.button,
                    { transform: [{ translateX: elementAddIncometranslateX }, { translateY: elementAddIncometranslateY }] }
                ]}>
                    <View style={[styles.buttonContainer, { backgroundColor: '#0f993a' }]}>
                        <Feather name="trending-up" size={18} color="#FFF" />
                    </View>
                    <Text style={styles.buttonText}>Renda</Text>
                </AnimatedTouchable>

                <AnimatedTouchable onPress={() => props.emitEvent("AddExpense")} style={[
                    styles.button,
                    { marginLeft: 80, transform: [{ translateX: elementAddExpensetranslateX }, { translateY: elementAddExpensetranslateY }] }
                ]}>
                    <View style={[styles.buttonContainer, { backgroundColor: '#d44' }]}>
                        <Feather name="trending-down" size={18} color="#FFF" />
                    </View>
                    <Text style={styles.buttonText}>Gasto</Text>
                </AnimatedTouchable>
            </View>
        </View>
    ) : <View />
}

export default BottomTabActionMenu;