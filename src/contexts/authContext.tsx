import React, { createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_IS_LOGGED } from "../constants/storage.constant";
import { AuthContextData } from "../interfaces/screens/auth.interface";

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: any) => {

    const [isLogged, setIsLogged] = React.useState<boolean>(false);

    React.useEffect(() => {
        checkIsLogged()
    }, [])

    const checkIsLogged = async () => {
        const isLoggedStorage = await AsyncStorage.getItem(ASYNC_IS_LOGGED)
        if (isLoggedStorage) setIsLogged(true)
    }

    const login = (email: string, password: string) => {

    }

    const loginWithoutAccount = () => {
        setIsLogged(true)
        AsyncStorage.setItem(ASYNC_IS_LOGGED, "true")
    }

    return (
        <AuthContext.Provider value={{ login, loginWithoutAccount, isLogged }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
