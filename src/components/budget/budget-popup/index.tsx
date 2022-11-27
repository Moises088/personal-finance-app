import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Image, Text } from 'react-native';
import { BudgetsContext } from '../../../contexts/budgetsContext';
import { ThemeContext } from '../../../contexts/themeContext';
import { getPipeMoneyString } from '../../../utils/money.util';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from '../../global/progress-bar';
import { styles } from './styles';

const IMAGE_BUDGET = require("../../../../assets/imgs/budget-popup-removebg.png")

/**
 * 
 * @image author https://br.freepik.com/vetores-gratis/prancheta-com-doc-oficial-gerenciando-dinheiro-extra-placa-com-papel-planejador-de-financas-pilha-de-moedas-amarelas-pilha-de-dinheiro-fundo-de-bonus-beneficios-e-prosperidade-ilustracao-em-vetor-conceito-metafora-isolado_11668644.htm#query=budget&position=0&from_view=search&track=sph
 */
const BudgetPopup: React.FC = () => {

    const navigation = useNavigation<StackNavigationProp<any>>()
    const { theme } = React.useContext(ThemeContext)
    const style = styles(theme);

    const { budgets } = React.useContext(BudgetsContext);
    const progress = parseFloat(((budgets?.totalExpense ?? 0) * 100 / (budgets?.value ?? 0)).toFixed(2));

    return (
        <View style={style.container} onTouchEnd={() => navigation.navigate("BudgetScreen")}>
            {budgets && (
                <View style={style.content}>
                    <View style={style.containerImage}>
                        <Image source={IMAGE_BUDGET} style={style.image} />
                    </View>

                    <View style={style.containerInfo}>
                        <Text style={style.title}>Seu orçamento</Text>
                        <ProgressBar
                            backColor={theme.background.secondary}
                            barColor={theme.button.primary}
                            progress={progress}
                            barText={`R$ ${getPipeMoneyString(budgets?.value)}/${getPipeMoneyString(budgets?.totalExpense)}`}
                        />
                    </View>
                </View>
            )}
        </View>
    );
}

export default BudgetPopup;