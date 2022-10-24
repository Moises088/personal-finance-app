import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../interfaces/themes.interface';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15
        }
    })
};