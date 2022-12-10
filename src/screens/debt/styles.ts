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
        titleHeader: {
            color: theme.text.primary,
            fontSize: 20,
            textAlign: "center",
            letterSpacing: 1,
            padding: 20
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
        btnReload: {
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#6232a8'
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
        containerFormExpand: {

        },
        title: {
            fontSize: 18,
            color: theme.text.primary,
            marginTop: 15,
            marginLeft: 8,
            padding: 10,
            backgroundColor: theme.background.primary,
            borderRadius: 8,
            marginBottom: 15
        },
        containerInfo: {
            padding: 10,
            paddingHorizontal: 15
        },
        label: {
            fontSize: 14,
            color: theme.text.primary,
            opacity: 0.7
        },
        info: {
            fontSize: 19,
            color: theme.text.primary,
            marginTop: 5
        }
    })
};
