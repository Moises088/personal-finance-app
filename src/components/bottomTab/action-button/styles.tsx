import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        actionButton: {
            width: 65,
            height: 65,
            borderRadius: 90,
            zIndex: 101,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -15,
            backgroundColor: theme.button.primary,
            elevation: 2,
            borderWidth: 4,
            borderColor: "#141b26"
        }
    })
};
