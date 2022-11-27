import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';
import { COLOR_DANGER } from '../../../constants/colors';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {},
        containerText: {
            marginHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center'
        },
        text: {
            marginHorizontal: 6,
            marginVertical: 2,
            color: COLOR_DANGER
        }
    })
};
