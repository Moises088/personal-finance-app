import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, Alert } from 'react-native';
import BudgetCard from '../../components/budget/budget-card';
import { COLOR_DANGER, COLOR_SUCCESS } from '../../constants/colors';
import { ThemeContext } from '../../contexts/themeContext';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { getPipeMoneyString } from '../../utils/money.util';
import { BudgetsContext } from '../../contexts/budgetsContext';
import GlobalPicker from '../../components/global/picker';
import { DATE_MONTH, DATE_YEAR } from '../../constants/date.constants';
import { FinancesContext } from '../../contexts/financesContext';
import CustomButtonAnimated from '../../components/global/custom-button-animated';
import CustomButton from '../../components/global/custom-button';

const IMAGE_BUDGET = require("../../../assets/imgs/budget-popup-removebg.png")

/**
 * @image author https://br.freepik.com/vetores-gratis/prancheta-com-doc-oficial-gerenciando-dinheiro-extra-placa-com-papel-planejador-de-financas-pilha-de-moedas-amarelas-pilha-de-dinheiro-fundo-de-bonus-beneficios-e-prosperidade-ilustracao-em-vetor-conceito-metafora-isolado_11668644.htm#query=budget&position=0&from_view=search&track=sph
*/
const BudgetScreen: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const [visibleMonth, setVisibleMonth] = React.useState<boolean>(false)
  const [visibleYear, setVisibleYear] = React.useState<boolean>(false)
  const [loadingEnd, setLoadingEnd] = React.useState<boolean>(false);

  const navigation = useNavigation<StackNavigationProp<any>>();
  const { filteredMonth, filteredYear, setFilteredMonth, setFilteredYear } = React.useContext(FinancesContext);
  const { budgets: budgetBalance, deleteBudget } = React.useContext(BudgetsContext);
  const remainder = ((budgetBalance?.value ?? 0) - (budgetBalance?.totalExpense ?? 0));

  const requestDeleteBudget = () => {
    setLoadingEnd(!loadingEnd)
    Alert.alert(
      "Deseja apagar o orçamento",
      "",
      [
        {
          text: "Não",
          onPress: () => { },
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: () => {
            if (budgetBalance?.id) deleteBudget(budgetBalance.id)
          }
        }
      ]
    );
  }

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

        <View style={style.containerDate}>
          <View style={style.date}>
            <AntDesign name="calendar" size={20} color={theme.button.primary} />
          </View>
          <TouchableOpacity style={style.dateBtn}>
            <GlobalPicker
              itens={DATE_MONTH}
              selectedItem={filteredMonth}
              setSelectedItem={setFilteredMonth}
              visible={visibleMonth}
              setVisible={setVisibleMonth}
            />
          </TouchableOpacity>

          <TouchableOpacity style={style.dateBtn}>
            <GlobalPicker
              itens={DATE_YEAR}
              selectedItem={filteredYear}
              setSelectedItem={setFilteredYear}
              visible={visibleYear}
              setVisible={setVisibleYear}
            />
          </TouchableOpacity>
        </View>

        {budgetBalance && (
          <>
            <View style={style.containerValue}>
              <Text style={[style.bannerText, { fontSize: 16 }]}>
                Orçamento atual
              </Text>

              <View style={style.valueContainerInfo}>
                <View style={style.valueInfo}>
                  <Text style={{ color: theme.text.primary }}>Total</Text>
                  <Text style={[style.value, { color: theme.text.primary }]}>
                    R$ {getPipeMoneyString((budgetBalance.value ?? 0))}
                  </Text>
                </View>
                <View style={style.valueInfo}>
                  <Text style={{ color: theme.text.primary }}>Gasto</Text>
                  <Text style={[style.value, { color: COLOR_DANGER }]}>
                    -R$ {getPipeMoneyString((budgetBalance.totalExpense ?? 0))}
                  </Text>
                </View>
                <View style={style.valueInfo}>
                  <Text style={{ color: theme.text.primary }}>Restante</Text>
                  <Text style={[style.value, { color: remainder >= 0 ? COLOR_SUCCESS : COLOR_DANGER }]}>
                    R$ {getPipeMoneyString(remainder)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={style.budgetCards}>
              {budgetBalance.categories.map((category, index) => (
                <BudgetCard key={index} item={category} />
              ))}
            </View>

            <View style={style.containerButton}>
              <CustomButton
                style={{ backgroundColor: COLOR_DANGER, height: 35 }}
                customStyle='btn'
                buttonText='Deletar orçamento'
                onPress={requestDeleteBudget}
              />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

export default BudgetScreen;