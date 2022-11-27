import { StyleSheet } from 'react-native';
import { WINDOW_HEIGTH, WINDOW_WIDTH } from '../../../constants/screen.contants';

export const styles = () => {
    return StyleSheet.create({
        container: {
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGTH,
            backgroundColor: "rgba(0,0,0,0.6)",
            alignItems: "center",
            justifyContent: "center",
        },
        gif: {
            width: 100,
            height: 100
        }
    })
};
