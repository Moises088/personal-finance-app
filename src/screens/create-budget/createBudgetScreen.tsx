import React from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import { TextInputMask } from 'react-native-masked-text';
import { BudgetForms, BudgetFormCategories, BudgetFormDebts } from '../../interfaces/screens/budget.interface';
import { DATE_MONTH, DATE_YEAR } from '../../constants/date.constants';
import { BudgetDto } from '../../interfaces/services/budget.interface';
import { getPipeMoneyNumber, getPipeMoneyString } from '../../utils/money.util';
import { AppBudgetService } from '../../services/budget';
import { COLOR_SUCCESS } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BudgetsContext } from '../../contexts/budgetsContext';
import { AppCategoryService } from '../../services/category';
import CustomButtonAnimated from '../../components/global/custom-button-animated';
import GlobalPicker from '../../components/global/picker';
import AlertError from '../../components/global/alert-error';
import { AppDebtsService } from '../../services/debts';

export const INPUT_MASK_OPTIONS = {
  precision: 2,
  separator: ',',
  delimiter: '.',
  unit: '',
  suffixUnit: ''
}

const CreateBudgetScreen: React.FC = () => {

  const [budgetForm, setBudgetForm] = React.useState<BudgetForms>({ categories: new Array(), debts: new Array(), total: "0,00" } as BudgetForms);

  const [filteredMonth, setFilteredMonth] = React.useState<string>('')
  const [filteredYear, setFilteredYear] = React.useState<string>('')
  const [visibleMonth, setVisibleMonth] = React.useState<boolean>(false)
  const [visibleYear, setVisibleYear] = React.useState<boolean>(false)
  const [loadingEnd, setLoadingEnd] = React.useState<boolean>(false);
  const [validation, setValidation] = React.useState<string[]>([]);

  const navigation = useNavigation<StackNavigationProp<any>>()

  const { getBudgetsBalance } = React.useContext(BudgetsContext);
  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  React.useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    const getCategories = await AppCategoryService.find();
    const categories: BudgetFormCategories[] = getCategories.map(category => ({ category, total: "0" }));

    const getDebts = await AppDebtsService.findInstitutions();
    const debts: BudgetFormDebts[] = getDebts.map(debt => ({ debt, total: getPipeMoneyString(debt.total) }))

    const totals = debts.filter(debt => debt.total != "0").map(debt => getPipeMoneyNumber(debt.total));
    let total = 0;
    totals.map(t => total += t);

    setBudgetForm(prev => ({ ...prev, categories, debts, total: getPipeMoneyString(total) }))
  }

  const setTotal = (total: string, index: number) => {
    const sum = budgetForm.categories
      .filter((r, i) => i !== index)
      .reduce((partialSum, a) => partialSum + parseFloat(a.total.replace(",", ".")), 0);

    setBudgetForm(prev => ({ ...prev, total: (sum + parseFloat(total.replace(",", "."))).toFixed(2).replace(".", ",") }))
  }

  const savebudget = async () => {
    const { categories, total } = budgetForm;
    const categoriesDto = categories.map(category => (
      { categoryId: category.category.id, total: getPipeMoneyNumber(category.total) }
    )).filter(c => c.total > 0);

    const erros = [];
    if (!categoriesDto?.length) erros.push("Adicione ao menos uma categoria")
    if (!getPipeMoneyNumber(total)) erros.push("O total é obrigatório e maior que zero")
    if (!filteredMonth) erros.push("Mês é obrigatório")
    if (!filteredYear) erros.push("Ano é obrigatório")
    setValidation(erros)

    if (erros.length) {
      setLoadingEnd(!loadingEnd)
      return;
    }

    try {
      const budgetDto: BudgetDto = { month: filteredMonth, year: filteredYear, categories: categoriesDto, total }
      await AppBudgetService.create(budgetDto)
      await getBudgetsBalance()
      navigation.goBack()
    } catch (error: any) {
      if (error?.message) setValidation([error.message])
    } finally { setLoadingEnd(!loadingEnd) }
  }

  return (
    <View style={style.container}>
      <View style={style.containerValue}>
        <View style={style.valuePrefix}>
          <Text style={style.valuePrefixText}>R$</Text>
        </View>
        <Text
          style={style.valueInput}
        >
          {budgetForm.total}
        </Text>
      </View>

      <AlertError errors={validation} />

      <ScrollView style={style.containerScroll}>
        <View>
          <Text style={style.label}>Selecione o mês</Text>
          <View style={style.containerButton}>
            <GlobalPicker
              itens={DATE_MONTH}
              selectedItem={filteredMonth}
              setSelectedItem={setFilteredMonth}
              visible={visibleMonth}
              setVisible={setVisibleMonth}
            />
          </View>

          <Text style={style.label}>Selecione o ano</Text>
          <View style={style.containerButton}>
            <GlobalPicker
              itens={DATE_YEAR}
              selectedItem={filteredYear}
              setSelectedItem={setFilteredYear}
              visible={visibleYear}
              setVisible={setVisibleYear}
            />
          </View>
        </View>

        <Text style={[style.textButton, { fontSize: 14, marginTop: 10 }]}>Escolha as categorias</Text>

        {budgetForm.categories.map((cate, i) => (
          <View key={i} style={style.containerCategory}>
            <View style={style.containerCategoryTitle}>
              <View style={style.containerIcon}>
                <FontAwesome5 name={cate.category.icon} size={18} color={theme.text.primary} />
              </View>
              <Text style={style.containerCategoryName}>{cate.category.name}</Text>
            </View>

            <View style={style.containerCategoryTotal}>
              <Text style={[style.valuePrefixText, { fontSize: 13 }]}>R$</Text>
              <TextInputMask
                type={'money'}
                options={INPUT_MASK_OPTIONS}
                value={budgetForm?.categories[i]?.total}
                onChangeText={(total: string) => {
                  setTotal(total, i)
                  setBudgetForm(prev => ({
                    ...prev, categories: budgetForm.categories.map((category, index) => {
                      if (index == i) category.total = total;
                      return category
                    })
                  }))
                }}
                style={style.valueInputCategory}
              />
            </View>
          </View>
        ))}

        {budgetForm.debts.map((debt, i) => (
          <View key={i} style={style.containerCategory}>
            <View style={style.containerCategoryTitle}>
              <View style={style.containerIcon}>
                <Image source={debt.debt.logo} style={{ width: 28, height: 28, borderRadius: 28 }} />
              </View>
              <Text style={style.containerCategoryName}>{debt.debt.name}</Text>
            </View>

            <View style={style.containerCategoryTotal}>
              <Text style={[style.valuePrefixText, { fontSize: 13 }]}>R$</Text>
              <TextInputMask
                type={'money'}
                options={INPUT_MASK_OPTIONS}
                value={budgetForm?.debts[i]?.total}
                onChangeText={(total: string) => {
                  setTotal(total, i)
                  setBudgetForm(prev => ({
                    ...prev, debts: budgetForm.debts.map((debt, index) => {
                      if (index == i) debt.total = total;
                      return debt
                    })
                  }))
                }}
                style={style.valueInputCategory}
              />
            </View>
          </View>
        ))}

        {budgetForm?.categories?.length != 0 && (
          <CustomButtonAnimated
            buttonText='Salvar orçamento'
            background={COLOR_SUCCESS}
            onPress={savebudget}
            isLoadingButton={true}
            loadingEnd={loadingEnd}
          />
        )}
      </ScrollView>
    </View>
  );
}

export default CreateBudgetScreen;