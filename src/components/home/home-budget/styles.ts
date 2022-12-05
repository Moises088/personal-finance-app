import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            marginHorizontal: 12,
            borderColor: theme.background.secondary,
            borderRadius: 8,
            marginBottom: 20,
            marginTop: 10
        },
        containerHeader: {
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 8,
            backgroundColor: theme.background.tertiary
        },
        textTitle: {
            color: theme.text.tertiary
        },
        containerValue: {
            padding: 20,
            paddingHorizontal: 10,
        },
        textValue: {
            color: theme.text.primary,
            fontSize: 22,
            fontWeight: "bold"
        },
        containerBalance: {
            padding: 12,
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 0,
            borderRadius: 10
        },
        containerBudget: {
            padding: 10,
            paddingTop: 18,
            borderRadius: 10,
            marginBottom: 10
        }
    })
};