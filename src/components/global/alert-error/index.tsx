import React from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { COLOR_DANGER } from '../../../constants/colors';

const AlertError: React.FC<{ errors: string[] }> = (props) => {
    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    return (
        <View style={style.container}>
            {props.errors.map((error, i) => (
                <View style={style.containerText} key={i}>
                    <MaterialIcons name="error-outline" size={16} color={COLOR_DANGER} />
                    <Text style={style.text}>{error}</Text>
                </View>
            ))}
        </View>
    );
}

export default AlertError;