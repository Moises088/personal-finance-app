import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../interfaces/screens/themes.interace';
import Constants from 'expo-constants'
import { WINDOW_WIDTH } from '../../constants/screen.contants';

const CONTAINER = WINDOW_WIDTH * 0.9;
const CONTAINER_LEFT = WINDOW_WIDTH * 0.05;
export const CHART_WIDTH = WINDOW_WIDTH * 0.8;
export const CHART_LEFT = WINDOW_WIDTH * 0.1;
export const CHART_STROKE = 15;

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background.primary,
            paddingTop: Constants.statusBarHeight
        },
        containerChart: {
            width: CHART_WIDTH,
            height: CHART_WIDTH,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: CHART_LEFT,
            marginTop: 35,
            position: "relative"
        },
        containerChartInside: {
            width: CHART_WIDTH - (CHART_STROKE * 2),
            height: CHART_WIDTH - (CHART_STROKE * 2),
            position: 'absolute'
        },
        containerChartValue: {
            width: CHART_WIDTH - (CHART_STROKE * 5),
            height: CHART_WIDTH - (CHART_STROKE * 5),
            borderRadius: 500,
            position: 'absolute',
            alignItems: "center",
            justifyContent: "center"
        },
        titleMoney: {
            fontWeight: "600",
            color: theme.text.primary,
            fontSize: 25,
            letterSpacing: 1.2,
            width: "75%",
            textAlign: "center"
        },
        containerBalance: {
            width: CONTAINER,
            marginLeft: CONTAINER_LEFT,
            marginTop: 20,
            alignItems: "center",
            flexDirection: "row"
        },
        containerBalanceValue: {
            width: "50%",
            height: 40,
            backgroundColor: theme.background.tertiary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            marginHorizontal: 2
        },
        balanceValue: {
            color: theme.text.primary,
            marginLeft: 10
        },
        content: {
            width: CONTAINER,
            marginLeft: CONTAINER_LEFT,
            marginTop: 20,
        }
    })
};
