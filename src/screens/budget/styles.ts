import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../interfaces/screens/themes.interace';
import Constants from 'expo-constants';
import { COLOR_SUCCESS } from '../../constants/colors';
import { WINDOW_WIDTH } from '../../constants/screen.contants';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background.primary,
            paddingTop: Constants.statusBarHeight
        },
        containerScroll: {
            flex: 1,
            paddingBottom: 60
        },
        createdButton: {
            margin: 20,
            marginTop: 25,
            backgroundColor: COLOR_SUCCESS,
            alignItems: "center",
            justifyContent: "center",
            height: 40,
            borderRadius: 6
        },
        textButton: {
            color: theme.text.primary,
            letterSpacing: 1.02,
            fontSize: 16
        },
        banner: {
            margin: 20,
            flexDirection: "row",
            alignItems: "center"
        },
        bannerContainerText: {
            width: (WINDOW_WIDTH / 2) - 10,
            height: (WINDOW_WIDTH / 2) - 40,
            justifyContent: "center",
            marginLeft: 10
        },
        bannerText: {
            color: theme.text.primary,
            fontSize: 20,
            letterSpacing: 1.2,
            // textAlign: 'right',
            paddingRight: 5,
            fontWeight: '600'
        },
        image: {
            width: (WINDOW_WIDTH / 2) - 40,
            height: (WINDOW_WIDTH / 2) - 40,
        },
        containerValue: {
            marginHorizontal: 20,
            marginBottom: 10,
            backgroundColor: theme.background.tertiary,
            padding: 10,
            borderRadius: 8
        },
        valueContainerInfo: {
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8
        },
        valueInfo: {
            marginTop: 10,
            minWidth: "32%",
            marginRight: "1%"
        },
        value: {
            letterSpacing: 0.6,
            marginTop: 3,
            fontSize: 14
        },
        budgetCards: {
            marginHorizontal: 12,
            marginTop: 15
        },
        containerDate: {
            flexDirection: "row",
            alignItems: "center",
            margin: 20,
            marginTop: 0
        },
        date: {
            width: 30,
            height: 30,
            borderRadius: 30,
            backgroundColor: theme.background.tertiary,
            marginRight: 10,
            alignItems: "center",
            justifyContent: "center"
        },
        dateBtn: {
            backgroundColor: theme.background.tertiary,
            paddingHorizontal: 5,
            borderRadius: 6,
            marginRight: 4
        },
        containerButton: {
            width: "80%",
            marginLeft: "10%",
            marginTop: 20,
            marginBottom: 20
        }
    })
};
