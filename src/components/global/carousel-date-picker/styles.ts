import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';
import { WINDOW_WIDTH } from '../../../constants/screen.contants';
import Constants from 'expo-constants'

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background.primary
        },
        headerDate: {
            padding: 10
        },
        containerCarouselMonth: {
            flexDirection: 'row',
            alignItems: 'center',
            height: 45,
            marginTop: 10
        },
        carouselMonthArrow: {
            backgroundColor: theme.background.secondary,
            width: 28,
            height: 28,
            borderRadius: 28,
            marginHorizontal: 5,
            alignItems: 'center',
            justifyContent: 'center'
        },
        carouselMonth: {
            width: WINDOW_WIDTH - 76,
            height: 45
        },
        carouselItem: {
            height: 30,
            marginTop: 7.5,
            alignItems: 'center',
            justifyContent: 'center',
            width: (WINDOW_WIDTH - 96) / 2,
            marginRight: 10,
            borderRadius: 20,
        },
        carouselItemText: {
            fontWeight: "600",
            color: "#FFF",
            fontSize: 14
        }
    })
};
