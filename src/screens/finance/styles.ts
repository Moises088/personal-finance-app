import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../interfaces/screens/themes.interace';
import Constants from 'expo-constants'
import { WINDOW_WIDTH } from '../../constants/screen.contants';
import { COLOR_DANGER } from '../../constants/colors';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background.primary,
            paddingTop: Constants.statusBarHeight
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
        },
        containerHeader: {
            justifyContent: "space-between",
            flexDirection: 'row',
            width: '100%',
            height: 50,
            marginTop: 10,
            alignItems: 'center',
            paddingHorizontal: 15,
        },
        headerIcon: {
            width: 25,
            height: 25,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10
        },
        headerPicker: {

        },
        containerValue: {
            padding: 15,
            paddingVertical: 30,
            flexDirection: 'row',
            alignItems: 'flex-end'
        },
        valuePrefix: {
            paddingBottom: 4,
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
        containerButton: {
            position: 'absolute',
            bottom: 30,
            width: WINDOW_WIDTH - 40,
            marginLeft: 20
        },
        btnDelete: {
            width: 30,
            height: 30,
            borderRadius: 30,
            backgroundColor: COLOR_DANGER,
            alignItems: "center",
            justifyContent: "center"
        }
    })
};
