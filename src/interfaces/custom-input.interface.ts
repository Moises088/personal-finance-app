import { KeyboardTypeOptions } from "react-native";

export interface CustomInputProps {
    icon: JSX.Element;
    onChangeText: (text: string) => void;
    keyboard?: KeyboardTypeOptions;
    placeholder?: string;
    secureTextEntry?: boolean;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
    value?: string | undefined
}