import React from 'react';
import { SafeAreaView, View, Text, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { FINANCE_OPTIONS } from '../../constants/finance.constants';
import { ThemeContext } from '../../contexts/themeContext';
import { styles } from './styles';
import { Ionicons, Feather } from '@expo/vector-icons';
import { COLOR_DANGER, COLOR_SUCCESS } from '../../constants/colors';
import { useRoute, RouteProp } from "@react-navigation/native";
import { TextInputMask } from 'react-native-masked-text';
import { getPipeCustomDateString, getPipeTransformDateStringNumber, getPipeTransformDateStringPT, validateDateString } from '../../utils/date.util';
import { FinanceDto, FinancesBalanceEntity } from '../../interfaces/services/finance.interface';
import { AppFinanceService } from '../../services/finance';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { FinancesContext } from '../../contexts/financesContext';
import { FinanceForms, ParamRoute } from '../../interfaces/screens/finance.interface';
import GlobalPicker from '../../components/global/picker';
import FinanceDetails from '../../components/finance/finance-details';
import CustomButtonAnimated from '../../components/global/custom-button-animated';
import AlertError from '../../components/global/alert-error';
import { AppWalletService } from '../../services/wallet';
import { getPipeMoneyString } from '../../utils/money.util';

const FinanceScreen: React.FC = () => {

  const navigation = useNavigation<StackNavigationProp<any>>();
  const { params } = useRoute<RouteProp<ParamRoute>>();
  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const [visibleFinanceType, setVisibleFinanceType] = React.useState<boolean>(false)
  const [financeType, setFinanceType] = React.useState<'INCOME' | 'EXPENSE'>();
  const [loadingEnd, setLoadingEnd] = React.useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = React.useState<boolean>(false);

  const [financeForm, setFinanceForm] = React.useState<FinanceForms>({ isPaid: false } as FinanceForms)
  const [validation, setValidation] = React.useState<string[]>([]);

  const inputRef = React.useRef<any>();

  const { getFinancesBalance, deleteFinance } = React.useContext(FinancesContext)

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => { setKeyboardVisible(true); });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { setKeyboardVisible(false); });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [])

  React.useEffect(() => {
    if (params?.finance) setUpdateFinance(params.finance);

    if (!financeType) setFinanceType(params.event)
    setTimeout(() => {
      if (inputRef.current) inputRef.current.getElement().focus();
    }, 250);
  }, []);

  const backgrounFinanceType = (financeType: string | undefined) => {
    if (financeType == 'INCOME') return COLOR_SUCCESS;
    if (financeType == 'EXPENSE') return COLOR_DANGER;
    return theme.button.primary;
  }

  const setUpdateFinance = async (finance: FinancesBalanceEntity) => {
    const getWallet = await AppWalletService.findOne(finance.walletId);
    if (!getWallet) return;

    const form: FinanceForms = {
      category: finance.category,
      description: finance.description,
      isPaid: finance.isPaid,
      money: getPipeMoneyString(finance.value),
      paidDate: getPipeCustomDateString(finance.paidAt, "DD/MM/YYYY"),
      title: finance.name,
      wallet: getWallet,
      id: finance.id
    }

    setFinanceForm(form)
  }

  const saveFinance = async () => {
    try {
      let { category, description, isPaid, money, paidDate, title: name, id } = financeForm;
      
      const erros = [];
      if (!category?.id) erros.push("Categoria é obrigatória");
      name = category?.name;

      if (!money || !money?.trim()?.length) erros.push("Valor é obrigatório")
      // if (!name || !name?.trim()?.length) erros.push("Título é obrigatório")
      if (!paidDate || paidDate?.length < 10) erros.push("Preencha a data corretamente")
      if (paidDate?.length == 10) erros.push(...validateDateString(getPipeTransformDateStringPT(paidDate)));
      setValidation(erros)

      if (!category || !money || !paidDate || !name || !financeType) return;

      const paid = getPipeTransformDateStringNumber(paidDate);
      const body: FinanceDto = { walletId: 1, categoryId: category.id, money, name, description, paid, isPaid, type: financeType }

      if (id) {
        await AppFinanceService.update(id, body);
      } else {
        await AppFinanceService.create(body);
      }


      await getFinancesBalance()
      navigation.goBack();

    } catch (error: any) {
      if (error?.message) setValidation([error.message])
    } finally { setLoadingEnd(!loadingEnd) }
  }

  const deleted = () => {

    const deletedFinance = async () => {
      if (financeForm.id) await deleteFinance(financeForm.id)
      navigation.goBack();
    }

    Alert.alert(
      "Deseja apagar a finança",
      "",
      [
        { text: "Não", onPress: () => { } },
        { text: "Sim", onPress: () => { deletedFinance() } }
      ]
    );
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={style.containerHeader}>
        <View style={style.header}>
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

        {financeForm.id && (
          <TouchableOpacity style={style.btnDelete} onPress={deleted}>
            <Feather name="trash" size={16} color="#FFF" />
          </TouchableOpacity>
        )}
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
          value={financeForm.money}
          onChangeText={(money: string) => setFinanceForm(prev => ({ ...prev, money }))}
          style={style.valueInput}
          ref={inputRef}
        />
      </View>

      <AlertError errors={validation} />

      <FinanceDetails
        // wallet={financeForm.wallet}
        // setWallet={wallet => setFinanceForm(prev => ({ ...prev, wallet }))}
        category={financeForm.category}
        setCategory={category => setFinanceForm(prev => ({ ...prev, category }))}
        paidDate={financeForm.paidDate}
        setPaidDate={paidDate => setFinanceForm(prev => ({ ...prev, paidDate }))}
        description={financeForm.description}
        setDescription={description => setFinanceForm(prev => ({ ...prev, description }))}
        isPaid={financeForm.isPaid}
        setIsPaid={isPaid => setFinanceForm(prev => ({ ...prev, isPaid }))}
      />

      {!keyboardVisible && (
        <View style={style.containerButton}>
          <CustomButtonAnimated
            buttonText='Salvar'
            background={backgrounFinanceType(financeType)}
            onPress={saveFinance}
            isLoadingButton={true}
            loadingEnd={loadingEnd}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default FinanceScreen;