import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import DebtsCard from '../../components/debts/debts-card';
import AlertError from '../../components/global/alert-error';
import CustomButtonAnimated from '../../components/global/custom-button-animated';
import GlobalPicker from '../../components/global/picker';
import { DEBTS_INSTITUTION } from '../../constants/debts.constants';
import { ThemeContext } from '../../contexts/themeContext';
import { DebtForms, DebtsInstitution } from '../../interfaces/services/debts.interface';
import { getPipeMoneyNumber } from '../../utils/money.util';
import { INPUT_MASK_OPTIONS } from '../create-budget/createBudgetScreen';
import { styles } from './styles';

const CreateDebtScreen: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);
  const defaultInstitution = DEBTS_INSTITUTION.find(debt => debt.name == "OUTRO") as DebtsInstitution;
  const form = { institution: defaultInstitution, total: "0", totalPerMonth: "0" } as DebtForms

  const [institutionSelected, setInstitutionSelected] = React.useState<string>("OUTRO");
  const [debtForms, setDebtForms] = React.useState<DebtForms>(form);
  const [visibleInstitution, setVisibleInstitution] = React.useState<boolean>(false)
  const [loadingEnd, setLoadingEnd] = React.useState<boolean>(false)
  const [validation, setValidation] = React.useState<string[]>([]);

  const createDebt = () => {
    const { institution, total, totalPerMonth } = debtForms;

    const erros = [];
    if (!institution?.name) erros.push("Adicione a instituição")
    if (!getPipeMoneyNumber(total)) erros.push("O total é obrigatório e maior que zero")
    setValidation(erros)

    if (erros.length) return

    try {

    } catch (error) {

    }
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
              value={debtForms.total}
              onChangeText={(totalPerMonth: string) => {
                setDebtForms(prev => ({ ...prev, totalPerMonth }));
              }}
              style={style.valueInputCategory}
            />
          </View>

          <View style={{ height: 30 }} />

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