import React from 'react';
import { SafeAreaView, View, Text, Keyboard } from 'react-native';
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
import { WalletEntity } from '../../interfaces/services/wallet.interface';
import { CategoryEntity } from '../../interfaces/services/category.interface';
import AlertError from '../../components/global/alert-error';
import { getPipeTransformDateStringNumber, getPipeTransformDateStringPT, validateDateString } from '../../utils/date.util';
import { FinanceDto } from '../../interfaces/services/finance.interface';
import { AppFinanceService } from '../../services/finance';

type ParamRoute = {
  Detail: {
    event: string;
  };
}

const FinanceScreen: React.FC = () => {

  const { params } = useRoute<RouteProp<ParamRoute>>();
  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const [visibleFinanceType, setVisibleFinanceType] = React.useState<boolean>(false)
  const [financeType, setFinanceType] = React.useState<string>();
  const [money, setMoney] = React.useState<string>();
  const [loadingEnd, setLoadingEnd] = React.useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = React.useState<boolean>(false);

  const [category, setCategory] = React.useState<CategoryEntity>();
  const [wallet, setWallet] = React.useState<WalletEntity>();
  const [paidDate, setPaidDate] = React.useState<string>();
  const [title, setTitle] = React.useState<string>();
  const [description, setDescription] = React.useState<string>();
  const [isPaid, setIsPaid] = React.useState<boolean>(false);

  const [validation, setValidation] = React.useState<string[]>([]);

  const inputRef = React.useRef<any>();

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => { setKeyboardVisible(true); });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => { setKeyboardVisible(false); });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [])

  React.useEffect(() => {
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

  const saveFinance = async () => {
    try {
      const erros = [];
      if (!money || !money?.trim()?.length) erros.push("Valor é obrigatório")
      if (!title || !title?.trim()?.length) erros.push("Título é obrigatório")
      if (!category?.id) erros.push("Categoria é obrigatória")
      if (!wallet?.id) erros.push("Carteira é obrigatória")
      if (!paidDate || paidDate?.length < 10) erros.push("Preencha a data corretamente")
      if (paidDate?.length == 10) erros.push(...validateDateString(getPipeTransformDateStringPT(paidDate)));

      setValidation(erros)

      if (!wallet || !category || !money || !title || !description || !paidDate) return

      if (!erros.length) {
        const body: FinanceDto = {
          walletId: wallet.id,
          categoryId: category.id,
          money,
          name: title,
          description,
          paid: getPipeTransformDateStringNumber(paidDate),
          isPaid
        }

        AppFinanceService.create(body)
      }
    } catch (error: any) {
      // if (error?.message) setValidation([error.message])
    } finally { setLoadingEnd(!loadingEnd) }
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

      <AlertError errors={validation} />

      <FinanceDetails
        category={category}
        setCategory={setCategory}
        wallet={wallet}
        setWallet={setWallet}
        paidDate={paidDate}
        setPaidDate={setPaidDate}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        setIsPaid={setIsPaid}
        isPaid={isPaid}
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