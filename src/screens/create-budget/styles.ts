import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../interfaces/screens/themes.interace';
import Constants from 'expo-constants';
import { COLOR_SUCCESS } from '../../constants/colors';
import { WINDOW_HEIGTH, WINDOW_WIDTH } from '../../constants/screen.contants';

const CONTAINER = WINDOW_WIDTH - 40;
const CONTAINER_LEFT = 20;

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background.primary,
            paddingTop: Constants.statusBarHeight
        },
        containerScroll: {
            flex: 1,
            width: CONTAINER,
            margin: CONTAINER_LEFT,
            marginBottom: 60
        },
        containerCategory: {
            width: CONTAINER,
            marginVertical: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        containerCategoryTitle: {
            maxWidth: CONTAINER / 2,
            flexDirection: "row",
            alignItems: "center"
        },
        containerIcon: {
            width: 30,
            height: 30,
            borderRadius: 30,
            backgroundColor: theme.background.tertiary,
            alignItems: "center",
            justifyContent: "center"
        },
        containerCategoryName: {
            color: theme.text.primary,
            marginLeft: 5,
            letterSpacing: 0.7,
            fontWeight: "600"
        },
        containerCategoryTotal: {
            maxWidth: CONTAINER / 2,
            flexDirection: "row",
            alignItems: "center",
        },
        createdButton: {
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
        containerValue: {
            padding: 15,
            paddingVertical: 30,
            flexDirection: 'row',
            alignItems: 'flex-end'
        },
        valuePrefix: {
            paddingBottom: 5,
            width: 30
        },
        valuePrefixText: {
            color: theme.text.primary,
            fontSize: 22,
        },
        valueInput: {
            color: theme.text.primary,
            fontSize: 32,
            fontWeight: 'bold',
            width: WINDOW_WIDTH - 70,
            marginLeft: 10
        },
        valueInputCategory: {
            color: theme.text.primary,
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 10,
            textAlign: 'right'
        },
        categoryButton: {
            marginTop: 25,
            alignItems: "center",
            justifyContent: "center",
            height: 40,
            borderRadius: 6,
            backgroundColor: theme.background.tertiary,
            marginBottom: 20
        },
        backdrop: {
            position: 'relative',
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGTH,
            backgroundColor: 'rgba(0,0,0,0.7)'
        },
        modal: {
            position: 'absolute',
            bottom: 0,
            padding: 5,
            paddingVertical: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGTH - 90,
            backgroundColor: theme.background.primary,
            overflow: 'hidden'
        },
        containerButton: {
            backgroundColor: theme.background.tertiary,
            alignItems: 'flex-start',
            padding: 5,
            paddingHorizontal: 10,
            marginBottom: 15,
            borderRadius: 8
            // justifyContent: 'center',
        },
        label: {
            color: theme.text.primary,
            fontSize: 14,
            letterSpacing: 0.6,
            marginBottom: 3
        }
    })
};
