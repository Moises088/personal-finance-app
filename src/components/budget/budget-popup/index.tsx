import React from 'react';
import { View, Image, Text } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import ProgressBar from '../../global/progress-bar';
import { styles } from './styles';

const IMAGE_BUDGET = require("../../../../assets/imgs/budget-popup-removebg.png")

/**
 * 
 * @image author https://br.freepik.com/vetores-gratis/prancheta-com-doc-oficial-gerenciando-dinheiro-extra-placa-com-papel-planejador-de-financas-pilha-de-moedas-amarelas-pilha-de-dinheiro-fundo-de-bonus-beneficios-e-prosperidade-ilustracao-em-vetor-conceito-metafora-isolado_11668644.htm#query=budget&position=0&from_view=search&track=sph
 */
const BudgetPopup: React.FC = () => {

    const { theme } = React.useContext(ThemeContext)
    const style = styles(theme);

    return (
        <View style={style.container}>
            <View style={style.content}>
                <View style={style.containerImage}>
                    <Image source={IMAGE_BUDGET} style={style.image} />
                </View>

                <View style={style.containerInfo}>
                    <Text style={style.title}>Seu orçamento</Text>
                    <ProgressBar backColor={theme.background.secondary} barColor={theme.button.primary} progress={80} barText="R$ 1000,00/1200,00" />
                </View>
            </View>
        </View>
    );
}

export default BudgetPopup;