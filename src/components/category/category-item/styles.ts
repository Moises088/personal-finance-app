import { StyleSheet } from 'react-native';
import { WINDOW_HEIGTH, WINDOW_WIDTH } from '../../../constants/screen.contants';
import { ThemesConfig } from '../../../types/screens/themes.type';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            width: "94%",
            marginLeft: "3%",
            marginTop: 10,
            backgroundColor: 'red'
        }
    })
};