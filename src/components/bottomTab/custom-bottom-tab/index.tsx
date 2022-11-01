import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { WINDOW_HEIGTH, WINDOW_WIDTH } from "../../../constants/screen.contants";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../../contexts/themeContext";
import BottomTabActionMenu from "../action-menu";
import BottomTabActionButton from "../action-button";
import styles from "./styles";

const CustomBottomTab = ({ navigation, state }: BottomTabBarProps) => {

    const [openMenu, setOpenMenu] = React.useState<boolean>(false);
    const [expandContainer, setExpandContainer] = React.useState<boolean>(false);
    const focusedRoute = state.routes[state.index].name;
    const { theme } = React.useContext(ThemeContext)

    const navigate: any = useNavigation()

    const getIcon = (routeName: string, color: string) => {
        const size = () => routeName == focusedRoute ? 18 : 20;
        if (routeName == "Home") return <Feather name="home" size={size()} color={color} />
        if (routeName == "Profile") return <Feather name="user" size={size()} color={color} />
    }

    const toggleMenu = () => {
        setOpenMenu(!openMenu)

        let timeout = expandContainer ? 150 : 0;
        setTimeout(() => {
            setExpandContainer(!expandContainer)
        }, timeout);
    }

    const navigateRoute = (routeName: string) => {
        navigation.navigate(routeName)
    }

    const receiveEvent = (event: string) => {
        navigate.navigate("FinanceScreen", { event })
    }

    const bottomTabItens = (routeName: string, index: number, color: string) => (
        routeName !== "Create" ? (
            <TouchableOpacity
                key={index}
                style={[styles.tabItem]}
                activeOpacity={0.6}
                onPress={() => navigateRoute(routeName)}
            >
                <View style={[styles.tabItemContainer, routeName == focusedRoute ? styles.tabItemActive : {}]}>
                    {getIcon(routeName, color)}
                    <Text style={[styles.tabItemText, { color }]}>{routeName == focusedRoute ? routeName : ""}</Text>
                </View>
            </TouchableOpacity>
        ) : <BottomTabActionButton key={index} toggleMenu={toggleMenu} openMenu={openMenu} />
    )

    return (
        <View style={[styles.container, { height: expandContainer ? WINDOW_HEIGTH : 60 }]}>
            <View style={styles.containerBottomTab}>
                {state.routes.map((route, index) => {
                    const color = route.name == focusedRoute ? theme.button.primary : "#FFF";
                    return bottomTabItens(route.name, index, color)
                })}
            </View>
            <BottomTabActionMenu openMenu={openMenu} toggleMenu={toggleMenu} emitEvent={receiveEvent} />
        </View>
    );
}

export default CustomBottomTab;