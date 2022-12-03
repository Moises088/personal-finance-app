import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { DEBTS_INSTITUTION } from '../../constants/debts.constants';
import { ThemeContext } from '../../contexts/themeContext';
import { DebtForms, DebtsBalance, DebtsDto, DebtsEntity, DebtsInstitution } from '../../interfaces/services/debts.interface';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import DebtsCard from '../../components/debts/debts-card';
import Carousel from '../../components/global/carousel';
import { WINDOW_WIDTH } from '../../constants/screen.contants';
import { AppDebtsService } from '../../services/debts';
import { getPipeMoneyString } from '../../utils/money.util';

const DebtScreen: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const navigation = useNavigation<StackNavigationProp<any>>();

  const [debts, setDebts] = React.useState<DebtsBalance[]>([])
  const [actual, setActual] = React.useState<DebtsBalance>()

  React.useEffect(() => {
    load()
  }, []);

  const load = async () => {
    const getDebts = await AppDebtsService.getDebtsBalance()
    const [debt] = getDebts;
    setDebts(getDebts);
    setActual(debt);
  }

  return (
    <SafeAreaView style={style.container}>
      {actual && (
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
      )}

      <View style={style.containerForm}>
        <ScrollView>
          <TouchableOpacity style={style.btn} onPress={() => navigation.navigate("CreateDebtScreen")}>
            <Text style={style.btnText}>+ Adicionar</Text>
          </TouchableOpacity>

          {actual && (
            <>
              <Text style={style.title}>{actual.institution.name}</Text>

              <View style={style.containerInfo}>
                <Text style={style.label}>Valor total</Text>
                <Text style={style.info}>R$ {getPipeMoneyString(actual.total)}</Text>
              </View>

              <View style={style.containerInfo}>
                <Text style={style.label}>Valor por mês</Text>
                <Text style={style.info}>{actual.totalMonth}x R$ {getPipeMoneyString(actual.totalPerMonth)}</Text>
              </View>

              <View style={style.containerInfo}>
                <Text style={style.label}>Data por mês</Text>
                <Text style={style.info}>{actual.paidMonthAt}</Text>
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