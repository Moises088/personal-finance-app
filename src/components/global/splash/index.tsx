import React from 'react';
import { View, Image, Text, Animated } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';

const SPLASH_GIF = require("../../../../assets/gifs/splash.gif")

/**
 * @autor image https://lottiefiles.com/53461-chart-webble
 */
const Splash: React.FC = () => {

    const { theme } = React.useContext(ThemeContext)
    const style = styles(theme);

    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 800,
                useNativeDriver: true
            }
        ).start();
    }, [])

    return (
        <View style={style.container}>
            <Image source={SPLASH_GIF} style={style.gif} />
            <View style={style.containerTitle}>
                <Animated.Text style={[style.title, { opacity: fadeAnim }]}>FINP</Animated.Text>
                <Animated.Text style={[style.subtitle, { opacity: fadeAnim }]}>Financeiro Pessoal</Animated.Text>
            </View>
        </View>
    );
}

export default Splash;