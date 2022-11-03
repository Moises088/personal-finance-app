import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import GlobalPicker from '../../components/global/picker';
import { FINANCE_OPTIONS } from '../../constants/finance.constants';
import { ThemeContext } from '../../contexts/themeContext';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { COLOR_DANGER, COLOR_SUCCESS } from '../../constants/colors';
import { useRoute, RouteProp } from "@react-navigation/native";
import { TextInputMask } from 'react-native-masked-text';
import FinanceDetails from '../../components/finance/finance-details';
import CustomButtonAnimated from '../../components/global/custom-button-animated';

type ParamRoute = {
  Detail: {
    event: string;
  };
}

const FinanceScreen: React.FC = () => {

  const { params } = useRoute<RouteProp<ParamRoute>>();

  React.useEffect(() => {
    if (!financeType) setFinanceType(params.event)
    setTimeout(() => {
      if (inputRef.current) inputRef.current.getElement().focus();
    }, 250);
  }, [])

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const [visibleFinanceType, setVisibleFinanceType] = React.useState<boolean>(false)
  const [financeType, setFinanceType] = React.useState<string>();
  const [money, setMoney] = React.useState<string>();
  const [loadingEnd, setLoadingEnd] = React.useState<boolean>(false);

  const inputRef = React.useRef<any>();

  const backgrounFinanceType = (financeType: string | undefined) => {
    if (financeType == 'INCOME') return COLOR_SUCCESS;
    if (financeType == 'EXPENSE') return COLOR_DANGER;
    return theme.button.primary;
  }

  const saveFinance = async () => {
    setLoadingEnd(false)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoadingEnd(true)
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={style.containerHeader}>
        <View style={[style.headerIcon, { backgroundColor: backgrounFinanceType(financeType) }]}>
          <Ionicons name="receipt" size={14} color="#FFF" />
        </View>
        <View style={style.headerPicker}>
          <GlobalPicker
            itens={FINANCE_OPTIONS}
            visible={visibleFinanceType}
            setVisible={setVisibleFinanceType}
            setSelectedItem={setFinanceType}
            selectedItem={financeType}
          />
        </View>
      </View>

      <View style={style.containerValue}>
        <View style={style.valuePrefix}>
          <Text style={style.valuePrefixText}>R$</Text>
        </View>
        <TextInputMask
          type={'money'}
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: '',
            suffixUnit: ''
          }}
          value={money}
          onChangeText={(text: string) => setMoney(text)}
          style={style.valueInput}
          ref={inputRef}
        />
      </View>

      <FinanceDetails
      />

      <View style={style.containerButton}>
        <CustomButtonAnimated
          buttonText='Salvar'
          background={backgrounFinanceType(financeType)}
          onPress={saveFinance}
          isLoadingButton={true}
          loadingEnd={loadingEnd}
        />
      </View>
    </SafeAreaView>
  );
}

export default FinanceScreen;