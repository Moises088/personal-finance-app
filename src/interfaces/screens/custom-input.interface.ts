import { KeyboardTypeOptions, StyleProp, TextStyle, ViewStyle } from "react-native";
import { TextInputMaskTypeProp } from "react-native-masked-text";

export interface CustomInputProps {
    icon: JSX.Element;
    onChangeText: (text: string) => void;
    keyboard?: KeyboardTypeOptions;
    placeholder?: string;
    placeholderTextColor?: string;
    secureTextEntry?: boolean;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
    value?: string | undefined;
    style?: StyleProp<ViewStyle>;
    styleInput?: StyleProp<TextStyle>;
    mask?: TextInputMaskTypeProp;
    maskCustom?: string;
    onPressIcon?: () => void;
}