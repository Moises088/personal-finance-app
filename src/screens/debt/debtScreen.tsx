import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext';
import { DebtsBalance } from '../../interfaces/services/debts.interface';
import { styles } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { WINDOW_WIDTH } from '../../constants/screen.contants';
import { getPipeMoneyString } from '../../utils/money.util';
import { COLOR_DANGER, COLOR_SUCCESS } from '../../constants/colors';
import { DebtsContext } from '../../contexts/debtsContext';
import { FontAwesome5 } from '@expo/vector-icons';
import FinanceHistoricCard from '../../components/finance/finance-historic-card';
import DebtsCard from '../../components/debts/debts-card';
import Carousel from '../../components/global/carousel';

const DebtScreen: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const { debts } = React.useContext(DebtsContext);
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [actual, setActual] = React.useState<DebtsBalance>()

  React.useEffect(() => {
    load()
  }, [debts]);

  const load = async () => {
    const [debt] = debts;
    setActual(debt);
  }

  const name = () => {
    if (!actual) return ""
    if (actual.institution.name != "OUTRO") return actual.institution.name;
    if (actual.institution.name == "OUTRO") return actual.institutionName;
  }

  return (
    <SafeAreaView style={style.container}>
      {actual ? (
        <View style={{ height: 180 }}>
          <Carousel
            itens={debts.map((debt, i) => (
              <View key={i} style={style.containerCard}>
                <DebtsCard institution={debt.institution} />
              </View>
            ))}
            width={WINDOW_WIDTH - 50}
            onChangeIndex={index => setActual(debts[index])}
          />
        </View>
      ) : (
        <Text style={style.titleHeader}>Crie novas faturas clicando em adicionar</Text>
      )}

      <View style={style.containerForm}>
        <ScrollView>
          <TouchableOpacity style={style.btn} onPress={() => navigation.navigate("CreateDebtScreen")}>
            <Text style={style.btnText}>+ Adicionar</Text>
          </TouchableOpacity>

          {actual && (
            <>
              <TouchableOpacity style={[style.btn, style.btnReload]} onPress={() => navigation.navigate("CreateDebtScreen", { debts: actual })}>
                <FontAwesome5 name="sync-alt" size={14} color="#FFF" />
                <Text style={style.btnText}> Atualizar</Text>
              </TouchableOpacity>

              <Text style={style.title}>{name()}</Text>

              <View style={style.containerInfo}>
                <Text style={style.label}>Valor total</Text>
                <Text style={style.info}>R$ {getPipeMoneyString(actual.total)}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={style.containerInfo}>
                  <Text style={style.label}>Valor pago</Text>
                  <Text style={[style.info, { color: COLOR_SUCCESS }]}>R$ {getPipeMoneyString(actual.totalPaid)}</Text>
                </View>

                <View style={style.containerInfo}>
                  <Text style={style.label}>Valor restante</Text>
                  <Text style={[style.info, { color: COLOR_DANGER }]}>R$ {getPipeMoneyString(actual.totalRemain)}</Text>
                </View>
              </View>

              <View style={style.containerInfo}>
                <Text style={style.label}>Valor por mês</Text>
                <Text style={style.info}>{actual.totalMonth}x R$ {getPipeMoneyString(actual.totalPerMonth)}</Text>
              </View>

              <View style={style.containerInfo}>
                <Text style={style.label}>Data por mês</Text>
                <Text style={style.info}>{actual.paidMonthAt}</Text>
              </View>

              <View style={style.containerInfo}>
                <Text style={style.label}>Histórico</Text>
                <View style={{ marginLeft: -8 }}>
                  {actual?.finances?.map((finance, i) => <FinanceHistoricCard key={i} finance={finance} />)}
                </View>
              </View>
            </>
          )}
          <View style={{ height: 30 }} />
        </ScrollView>
      </View>
    </SafeAreaView >
  );
}

export default DebtScreen;