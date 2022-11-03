type ThemesPositions = {
    readonly primary: string;
    readonly secondary: string;
    readonly tertiary?: string;
}

export type ThemesConfig = {
    readonly background: ThemesPositions;
    readonly text: ThemesPositions;
    readonly button: ThemesPositions;
}

export type ThemeContextData = {
    setTheme: (theme: "dark" | "default") => void;
    theme: ThemesConfig
}

export type ThemeContextResponse = {
    dark: ThemesConfig;
    default: ThemesConfig
}