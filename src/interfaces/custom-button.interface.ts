import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

export interface CustomButtonProps {
    buttonText: string;
    customStyle: "btn" | "outline";
    style?: StyleProp<ViewStyle>;
    onPress?: ((event: GestureResponderEvent) => void)
}

export interface CustomButtonAnimatedProps {
    background: string;
    buttonText: string;
    isLoadingButton: boolean;
    loadingEnd?: boolean;
    onPress: (event: GestureResponderEvent) => void;
}