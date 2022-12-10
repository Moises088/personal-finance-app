import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            padding: 20,
            flexDirection: 'row',
            alignItems: "flex-end"
        },
        subtitle: {
            fontSize: 10,
            color: "#FFF",
            marginBottom: 3,
            opacity: 0.6
        },
        bar: {
            width: 30,
            borderRadius: 8,
        }
    })
};