import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../interfaces/screens/themes.interace';
import Constants from 'expo-constants'
import { WINDOW_WIDTH } from '../../constants/screen.contants';

const CHART = WINDOW_WIDTH - 50;

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background.primary,
            paddingTop: Constants.statusBarHeight
        },
        containerChart: {
            width: CHART,
            height: CHART,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 15,
            marginTop: 35,
            position: "relative"
        },
        containerChartInside: {
            width: CHART - 36,
            height: CHART - 36,
            position: 'absolute'
        }
    })
};
