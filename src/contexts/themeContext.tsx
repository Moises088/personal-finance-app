import React, { createContext } from "react";
import { ThemeContextData, ThemeContextResponse } from "../interfaces/screens/themes.interace";
import { DarkTheme } from "../themes/dark.theme";
import { DefaultTheme } from "../themes/default.theme";

export const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider = ({ children }: any) => {

    const [actualTheme, setActualTheme] = React.useState<"dark" | "default">("dark");

    const theme: ThemeContextResponse = {
        "dark": DarkTheme,
        "default": DefaultTheme
    }

    return (
        <ThemeContext.Provider value={{ setTheme: setActualTheme, theme: theme[actualTheme] }}>
            {children}
        </ThemeContext.Provider>
    )

}

export default ThemeProvider;
