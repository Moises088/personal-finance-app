import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/home/homeScreen";
import CustomBottomTab from "../components/bottomTab/custom-bottom-tab";
import ProfileScreen from "../screens/profile/profileScreen";
import FinanceScreen from "../screens/finance/financeScreen";
import FinanceHistoricScreen from "../screens/financeHistoric/financeHistoricScreen";
import BudgetScreen from "../screens/budget/budgetScreen";
import CreateBudgetScreen from "../screens/create-budget/createBudgetScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabRoutes = () => {
    return (
        <Tab.Navigator tabBar={props => <CustomBottomTab {...props} />}>
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Create" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

const AppRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={TabRoutes} options={{ headerShown: false }} />
            <Stack.Screen name="FinanceScreen" component={FinanceScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="FinanceHistoricScreen" component={FinanceHistoricScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="BudgetScreen" component={BudgetScreen} options={{ headerShown: false, }} />
            <Stack.Screen name="CreateBudgetScreen" component={CreateBudgetScreen} options={{ headerShown: false, }} />
        </Stack.Navigator>
    );
}

export default AppRoutes;