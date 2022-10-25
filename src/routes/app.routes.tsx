import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/home/homeScreen";
import CustomBottomTab from "../components/bottomTab/custom-bottom-tab";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabRoutes = () => {
    return (
        <Tab.Navigator tabBar={props => <CustomBottomTab {...props} />}>
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

const AppRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={TabRoutes} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default AppRoutes;