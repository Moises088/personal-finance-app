import { StyleSheet } from 'react-native';
import { ThemesConfig } from '../../../interfaces/screens/themes.interace';
import Constants from 'expo-constants';

export const styles = (theme: ThemesConfig) => {
    return StyleSheet.create({
        container: {
            marginTop: 4,
            height: 200,
            width: 250,
            borderRadius: 10,
            backgroundColor: theme.background.tertiary,
            position: "relative",
            overflow: "hidden",
            marginRight: 8,
            marginLeft: 2
        },
        backgroundImage: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 200,
            opacity: 0.05
        },
        containerTitle: {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 5,
            margin: 5
        },
        text: {
            color: theme.text.primary,
            fontSize: 18,
            fontWeight: "bold",
            letterSpacing: 0.6
        },
        containerIcon: {
            width: 45,
            height: 45,
            borderRadius: 45,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 7
        },
        containerMoney: {
            padding: 10,
            paddingHorizontal: 15,
            height: 100,
            marginBottom: 10,
            justifyContent: "center"
        },
        label: {
            color: theme.text.primary,
            fontSize: 12,
            opacity: 0.5
        },
        containerProgress: {
            width: "90%",
            marginLeft: "5%"
        },
        image: {
            width: 38,
            height: 38,
            borderRadius: 38
        }
    })
};