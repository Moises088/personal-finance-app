import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "../screens/login/loginScreen";

const Stack = createStackNavigator();

const AuthRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default AuthRoutes;