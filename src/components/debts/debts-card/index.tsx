import React from 'react';
import { View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';
import { DebtsInstitution } from '../../../interfaces/services/debts.interface';

const DebtsCard: React.FC<{ institution: DebtsInstitution | undefined }> = ({ institution }) => {

    const spinValue = React.useRef(new Animated.Value(0)).current;
    const spin = spinValue.interpolate({
        inputRange: [0, 1, 2, 3, 4, 5, 6],
        outputRange: ['0deg', '30deg', '60deg', '90deg', '-30deg', '-60deg', '0deg']
    })

    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    const [backgroundColor, setBackgroundColor] = React.useState("#FFF")
    const [image, setImage] = React.useState()

    React.useEffect(() => {
        animated()
    }, [institution])

    const animated = () => {
        setTimeout(() => {
            if (institution?.color) {
                setBackgroundColor(institution.color)
                setImage(institution.logo)
            }
        }, 450);

        Animated.sequence([
            Animated.timing(spinValue, {
                toValue: 3,
                duration: 450,
                useNativeDriver: true,
            }),
            Animated.timing(spinValue, {
                toValue: 6,
                duration: 450,
                useNativeDriver: true,
            })
        ]).start()
    }

    return (
        <Animated.View style={[
            style.container,
            {
                transform: [{ rotateY: spin }],
                backgroundColor
            }
        ]}>
            <View style={style.containerLogo}>
                {image && (
                    <Image source={image} style={style.image} />
                )}
            </View>
            <View style={style.containerTitle}>
                <Text style={[style.title, { color: institution?.color != "#FFF" ? "#FFF" : "#000" }]}>
                    FATURA
                </Text>
            </View>
        </Animated.View>
    )
}
export default DebtsCard;