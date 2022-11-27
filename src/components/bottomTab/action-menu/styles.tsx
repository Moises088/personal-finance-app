import { StyleSheet } from 'react-native';
import { WINDOW_HEIGTH } from '../../../constants/screen.contants';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    backdrop: {
        position: 'absolute',
        height: WINDOW_HEIGTH,
        zIndex: 100,
        width: '100%',
        left: 0,
        bottom: 75,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button: {
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        marginTop: 3,
        color: '#FFF',
        fontSize: 12
    }
});
