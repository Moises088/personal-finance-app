import React from 'react';
import { View, Text } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';
import { FontAwesome5 } from '@expo/vector-icons';
import ProgressBar from '../../global/progress-bar';

const BudgetCard: React.FC = () => {
    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    return (
        <View style={style.container}>
            <View style={style.containerIcon}>
                <FontAwesome5 name="home" size={18} color={theme.text.primary} />
            </View>
            <View style={style.containerInfo}>
                <View style={style.containerHeader}>
                    <Text style={style.text}>Aluguel</Text>
                    <Text style={style.text}>R$ 50,00</Text>
                </View>
                <ProgressBar
                    backColor={theme.background.secondary}
                    barColor={'red'}
                    progress={50}
                    barText={`50%`}
                />
            </View>
        </View>
    );
}

export default BudgetCard;