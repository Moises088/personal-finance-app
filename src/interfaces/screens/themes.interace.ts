type ThemesPositions = {
    readonly primary: string;
    readonly secondary: string;
    readonly tertiary?: string;
}

export interface ThemesConfig {
    readonly background: ThemesPositions;
    readonly text: ThemesPositions;
    readonly button: ThemesPositions;
}

export interface ThemeContextData {
    setTheme: (theme: "dark" | "default") => void;
    theme: ThemesConfig
}

export interface ThemeContextResponse {
    dark: ThemesConfig;
    default: ThemesConfig
}