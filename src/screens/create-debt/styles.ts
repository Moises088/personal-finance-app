import { StyleSheet, Dimensions } from 'react-native';
import { ThemesConfig } from '../../interfaces/screens/themes.interace';
import Constants from 'expo-constants';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background.primary,
            paddingTop: Constants.statusBarHeight + 20
        },
        containerScroll: {
            flex: 1,
            paddingBottom: 60
        },
        containerCard: {
            width: "80%",
            marginLeft: "10%",
            paddingVertical: 10
        },
        containerBtn: {
            backgroundColor: theme.background.primary,
            alignItems: 'flex-start',
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 8
        },
        containerInput: {
            marginVertical: 8,
        },
        valueInputCategory: {
            backgroundColor: theme.background.primary,
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 8,
            minHeight: 50,
            color: theme.text.primary
        },
        containerForm: {
            backgroundColor: theme.background.tertiary,
            marginTop: 30,
            paddingHorizontal: 10,
            flex: 1,
            paddingVertical: 20,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25
        },
        label: {
            color: theme.text.primary,
            marginBottom: 6,
            marginLeft: 2
        },
        inputDate: {
            backgroundColor: 'red'
        }
    })
};
