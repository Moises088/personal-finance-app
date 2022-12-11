import React from 'react';
import { View, Text, Image } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { styles } from './styles';
import { FontAwesome5 } from '@expo/vector-icons';
import ProgressBar from '../../global/progress-bar';
import { BudgetsBalanceCategory } from '../../../interfaces/services/budget.interface';
import { getPipeMoneyString } from '../../../utils/money.util';

const BudgetCard: React.FC<{ item: BudgetsBalanceCategory }> = ({ item }) => {
    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    const progress = parseFloat(((item.used * 100) / item.total).toFixed(2));

    const Icon: React.FC = () => {
        if (item.categoryId) return <FontAwesome5 name={item.category?.icon} size={18} color={theme.text.primary} />
        if (item.debtId) return <Image source={item.debt?.logo} style={style.image} />
        return <View />
    }

    return (
        <View style={style.container}>
            <View style={style.containerIcon}>
                <Icon />
            </View>
            <View style={style.containerInfo}>
                <View style={style.containerHeader}>
                    <Text style={style.text}>{item.category?.name}</Text>
                    <Text style={style.text}>R$ {getPipeMoneyString(item.total)}</Text>
                </View>
                <ProgressBar
                    backColor={theme.background.secondary}
                    barColor={item.category?.color ?? theme.button.primary}
                    progress={progress}
                    barText={`${progress}% (R$ ${getPipeMoneyString(item.used)})`}
                />
            </View>
        </View>
    );
}

export default BudgetCard;