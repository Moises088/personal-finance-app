import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';
import { WINDOW_WIDTH } from '../../../constants/screen.contants';
import Constants from 'expo-constants'

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        headerDate: {
            padding: 10
        },
        containerCarouselMonth: {
            flexDirection: 'row',
            alignItems: 'center',
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
            
        }
    })
};
