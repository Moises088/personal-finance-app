import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../interfaces/themes.interface';
import Constants from 'expo-constants'
import { WINDOW_WIDTH } from '../../constants/screen.contants';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background.primary,
            paddingTop: Constants.statusBarHeight
        },
        containerHeader: {
            flexDirection: 'row',
            width: '100%',
            height: 50,
            marginTop: 10,
            alignItems: 'center',
            paddingLeft: 15
        },
        headerIcon: {
            width: 25,
            height: 25,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10
        },
        headerPicker: {},
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
        }
    })
};
