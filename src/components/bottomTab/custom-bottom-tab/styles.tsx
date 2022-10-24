import { StyleSheet } from 'react-native';
// import { COLOR_DARK_LIGHT } from '../../../constants/colors.contants';
import { WINDOW_HEIGTH, WINDOW_WIDTH } from '../../../constants/screen.contants';

export default StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.65)',
        position: 'absolute',
        borderTopWidth: 0,
        elevation: 0,
        bottom: 0,
        width: WINDOW_WIDTH,
        justifyContent: 'flex-end'
    },
    containerBottomTab: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#171e29'
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
    tabItem: {
        flex: 1,
        height: 50,
        marginHorizontal: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 6
    },
    tabItemText: {
        fontSize: 12,
        marginLeft: 6
    },
    tabItemActive: {
        backgroundColor: "#252a33",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginTop: 5
    }
});
