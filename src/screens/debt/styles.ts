import { StyleSheet, Dimensions } from 'react-native';
import { ThemesConfig } from '../../interfaces/screens/themes.interace';
import Constants from 'expo-constants';
import { COLOR_SUCCESS } from '../../constants/colors';
import { WINDOW_WIDTH } from '../../constants/screen.contants';

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
            width: WINDOW_WIDTH - 50,
            paddingHorizontal: 10,
        },
        btn: {
            backgroundColor: COLOR_SUCCESS,
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 12,
            maxWidth: 120,
            marginLeft: 10,
            marginBottom: 10,
            alignItems: "center"
        },
        btnText: {
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
        title: { 
            fontSize: 24, 
            color: "#FFF",
            marginTop: 15,
            marginLeft: 8
        }
    })
};
