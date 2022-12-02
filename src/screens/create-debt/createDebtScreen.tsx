import React from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import DebtsCard from '../../components/debts/debts-card';
import AlertError from '../../components/global/alert-error';
import CustomButtonAnimated from '../../components/global/custom-button-animated';
import CustomInput from '../../components/global/custom-input';
import GlobalPicker from '../../components/global/picker';
import { DEBTS_INSTITUTION } from '../../constants/debts.constants';
import { ThemeContext } from '../../contexts/themeContext';
import { DebtForms, DebtsDto, DebtsInstitution } from '../../interfaces/services/debts.interface';
import { AppDebtsService } from '../../services/debts';
import { getPipeMoneyNumber } from '../../utils/money.util';
import { INPUT_MASK_OPTIONS } from '../create-budget/createBudgetScreen';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import DatetimePicker from '../../components/global/datetime-picker';
import { getPipeCustomDateString } from '../../utils/date.util';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const CreateDebtScreen: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);
  const defaultInstitution = DEBTS_INSTITUTION.find(debt => debt.name == "OUTRO") as DebtsInstitution;
  const form = { institution: defaultInstitution, total: "0", totalPerMonth: "0" } as DebtForms;
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [institutionSelected, setInstitutionSelected] = React.useState<string>("OUTRO");
  const [debtForms, setDebtForms] = React.useState<DebtForms>(form);
  const [visibleInstitution, setVisibleInstitution] = React.useState<boolean>(false)
  const [loadingEnd, setLoadingEnd] = React.useState<boolean>(false)
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState<boolean>(false)
  const [validation, setValidation] = React.useState<string[]>([]);

  const createDebt = async () => {
    const { institution, total, totalPerMonth, paidMonthAt, institutionName } = debtForms;

    const erros = [];
    if (!institution?.name) erros.push("Adicione a instituição");
    if (institution.name == "OUTRO") {
      if(!institutionName) erros.push("Nome da instituição é obrigatória")
    }
    if (!getPipeMoneyNumber(total)) erros.push("O total é obrigatório e maior que zero");
    if (getPipeMoneyNumber(totalPerMonth) > 0) {
      if (!paidMonthAt) erros.push("A data do mês é obrigatória")
    }
    setValidation(erros)

    if (erros.length) {
      setLoadingEnd(!loadingEnd)
      return
    }

    try {
      const debtDto: DebtsDto = {
        institution, paidMonthAt,
        total: getPipeMoneyNumber(total),
        totalPerMonth: getPipeMoneyNumber(totalPerMonth),
        type: "INVOICE",
        institutionName
      }
      await AppDebtsService.create(debtDto);
      navigation.goBack()
    } catch (error: any) {
      if (error?.message) setValidation([error.message])
    } finally { setLoadingEnd(!loadingEnd) }
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={style.containerCard}>
        <DebtsCard institution={debtForms.institution} />
      </View>

      <View style={style.containerForm}>
        <AlertError errors={validation} />
        <ScrollView>
          <View style={style.containerInput}>
            <Text style={style.label}>Instituição</Text>
            <View style={style.containerBtn}>
              <GlobalPicker
                itens={DEBTS_INSTITUTION.map(debt => ({ label: debt.name, value: debt.name }))}
                selectedItem={institutionSelected}
                setSelectedItem={item => {
                  const defaultInstitution = DEBTS_INSTITUTION.find(debt => debt.name == item) as DebtsInstitution;
                  setDebtForms(prev => ({ ...prev, institution: defaultInstitution }));
                  setInstitutionSelected(item);
                }}
                visible={visibleInstitution}
                setVisible={setVisibleInstitution}
              />
            </View>
          </View>

          {debtForms.institution.name == "OUTRO" && (
            <View style={style.containerInput}>
              <Text style={style.label}>Nome da instituição</Text>
              <TextInput
                value={debtForms.institutionName}
                onChangeText={(institutionName: string) => {
                  setDebtForms(prev => ({ ...prev, institutionName }));
                }}
                style={style.valueInputCategory}
              />
            </View>
          )}

          <View style={style.containerInput}>
            <Text style={style.label}>Valor total</Text>
            <TextInputMask
              type={'money'}
              options={{
                ...INPUT_MASK_OPTIONS,
                unit: "R$ "
              }}
              value={debtForms.total}
              onChangeText={(total: string) => {
                setDebtForms(prev => ({ ...prev, total }));
              }}
              style={style.valueInputCategory}
            />
          </View>

          <View style={style.containerInput}>
            <Text style={style.label}>Valor total por mês</Text>
            <TextInputMask
              type={'money'}
              options={{
                ...INPUT_MASK_OPTIONS,
                unit: "R$ "
              }}
              value={debtForms.totalPerMonth}
              onChangeText={(totalPerMonth: string) => {
                setDebtForms(prev => ({ ...prev, totalPerMonth }));
              }}
              style={style.valueInputCategory}
            />
          </View>

          <View style={style.containerInput}>
            <Text style={style.label}>Data de pagamento</Text>
            <CustomInput
              icon={<AntDesign name="calendar" size={20} color={theme.button.primary} />}
              onChangeText={(paidMonthAt) => { setDebtForms(prev => ({ ...prev, paidMonthAt })) }}
              value={debtForms.paidMonthAt}
              style={[style.valueInputCategory, { padding: 0 }]}
              styleInput={{ color: theme.text.primary }}
              placeholder="Data de pagamento"
              placeholderTextColor="#b3b3b3"
              mask='custom'
              maskCustom='99/99/9999'
              keyboard='numeric'
              onPressIcon={() => setDatePickerVisibility(true)}
            />
          </View>

          <View style={{ height: 30 }} />

          <DatetimePicker
            isDatePickerVisible={isDatePickerVisible}
            onChange={(date) => {
              setDatePickerVisibility(false);
              if (!date) return
              setDebtForms(prev => ({ ...prev, paidMonthAt: getPipeCustomDateString(date.getTime(), "DD/MM/YYYY") }))
            }}
          />

          <CustomButtonAnimated
            buttonText='Salvar'
            background={theme.button.primary}
            onPress={createDebt}
            isLoadingButton={true}
            loadingEnd={loadingEnd}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default CreateDebtScreen;