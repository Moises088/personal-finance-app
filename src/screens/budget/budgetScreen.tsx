import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import BudgetCard from '../../components/budget/budget-card';
import { COLOR_DANGER, COLOR_SUCCESS } from '../../constants/colors';
import { ThemeContext } from '../../contexts/themeContext';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const IMAGE_BUDGET = require("../../../assets/imgs/budget-popup-removebg.png")

/**
 * @image author https://br.freepik.com/vetores-gratis/prancheta-com-doc-oficial-gerenciando-dinheiro-extra-placa-com-papel-planejador-de-financas-pilha-de-moedas-amarelas-pilha-de-dinheiro-fundo-de-bonus-beneficios-e-prosperidade-ilustracao-em-vetor-conceito-metafora-isolado_11668644.htm#query=budget&position=0&from_view=search&track=sph
*/
const BudgetScreen: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const navigation = useNavigation<StackNavigationProp<any>>()

  return (
    <View style={style.container}>
      <TouchableOpacity style={style.createdButton} activeOpacity={0.8} onPress={() => { navigation.navigate("CreateBudgetScreen") }}>
        <Text style={style.textButton}>+ Novo orçamento</Text>
      </TouchableOpacity>

      <ScrollView style={style.containerScroll}>

        <View style={style.banner}>
          <View>
            <Image source={IMAGE_BUDGET} style={style.image} />
          </View>
          <View style={style.bannerContainerText}>
            <Text style={style.bannerText}>
              Crie seu orçamento e gerencie seus gastos
            </Text>
          </View>
        </View>

        <TouchableOpacity style={style.containerDate} >
          <View style={style.date}>
            <AntDesign name="calendar" size={20} color={theme.button.primary} />
          </View>
          <Text style={[style.bannerText, { fontSize: 16 }]}>Novembro 2021</Text>
        </TouchableOpacity>

        <View style={style.containerValue}>
          <Text style={[style.bannerText, { fontSize: 16 }]}>
            Orçamento atual
          </Text>

          <View style={style.valueContainerInfo}>
            <View style={style.valueInfo}>
              <Text style={{ color: theme.text.primary }}>Total</Text>
              <Text style={[style.value, { color: theme.text.primary }]}>R$ 2000</Text>
            </View>
            <View style={style.valueInfo}>
              <Text style={{ color: theme.text.primary }}>Gasto</Text>
              <Text style={[style.value, { color: COLOR_DANGER }]}>-R$ 1000</Text>
            </View>
            <View style={style.valueInfo}>
              <Text style={{ color: theme.text.primary }}>Restante</Text>
              <Text style={[style.value, { color: COLOR_SUCCESS }]}>+R$ 1000</Text>
            </View>
          </View>
        </View>

        <View style={style.budgetCards}>
          <BudgetCard />
          <BudgetCard />
          <BudgetCard />
          <BudgetCard />
          <BudgetCard />
          <BudgetCard />
          <BudgetCard />
        </View>
      </ScrollView>
    </View>
  );
}

export default BudgetScreen;