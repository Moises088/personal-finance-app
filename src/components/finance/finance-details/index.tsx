import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import CustomInput from '../../global/custom-input';
import { styles } from './styles';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import CategoryScreen from '../../../screens/category/categoryScreen';
import { AppWalletService } from '../../../services/wallet';
import DatetimePicker from '../../global/datetime-picker';
import { getPipeCustomDateString } from '../../../utils/date.util';
import { FinanceDetailsProps } from '../../../interfaces/screens/finance.interface';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { DEBTS_INSTITUTION } from '../../../constants/debts.constants';
import { DebtsInstitution } from '../../../interfaces/services/debts.interface';

const FinanceDetails: React.FC<FinanceDetailsProps> = (props) => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState<boolean>(false)
  const [openOptions, setOpenOptions] = React.useState<boolean>(false);
  const [optionsType, setOptionsType] = React.useState<string>("");

  const CategorySelection: React.FC = () => {
    if (props.category) return (
      <>
        <FontAwesome5 name={props.category.icon} color={theme.text.primary} size={17} style={{ marginLeft: 10 }} />
        <Text style={style.selectText}>{props.category.name}</Text>
      </>
    )

    if (props.bill) return (
      <>
        <View style={[style.card, { backgroundColor: props.bill.color }, style.minCard]}>
          <Image source={props.bill.logo} style={[style.cardLogo, style.minLogo]} />
        </View>
        <Text style={style.selectText}>{props.bill.name}</Text>
      </>
    )

    return <Text style={style.selectText}>Categoria</Text>
  }

  const Options = () => (
    <View style={style.containerOptions}>
      <TouchableOpacity style={style.buttonOption} onPress={() => { setOptionsType("Category") }}>
        <MaterialIcons name="category" size={26} color={theme.text.primary} />
        <Text style={style.buttonOptionText}>Categoria</Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.buttonOption} onPress={() => { setOptionsType("Bill") }}>
        <FontAwesome5 name="receipt" size={24} color={theme.text.primary} />
        <Text style={style.buttonOptionText}>Fatura</Text>
      </TouchableOpacity>
    </View>
  )

  const Debts = ({ debit }: { debit: DebtsInstitution }) => (
    <TouchableOpacity onPress={() => {
      setOpenOptions(false);
      setOptionsType("");
      props.setCategory(undefined);
      props.setBill(debit)
    }}>
      <View style={style.containerInstitution}>
        <View style={[style.card, { backgroundColor: debit.color }]}>
          <Image source={debit.logo} style={style.cardLogo} />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={{ color: theme.text.primary, fontSize: 18 }}>{debit.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={style.container}>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={{ marginBottom: 50 }}>
          <View style={style.containerInput}>
            <CustomInput
              icon={<MaterialCommunityIcons name="subtitles-outline" size={19} color={theme.button.primary} />}
              onChangeText={(text) => { props.setDescription(text) }}
              style={style.input}
              styleInput={style.inputText}
              placeholder="Descrição (opcional)"
              placeholderTextColor="#b3b3b3"
              value={props.description}
            />
          </View>

          <TouchableOpacity
            style={[style.containerSelect, props.category ? { backgroundColor: props.category.color } : {}]}
            activeOpacity={.5}
            onPress={() => {
              if (props?.financeType == "INCOME") setOptionsType("Category")
              setOpenOptions(true)
            }}
          >
            <View style={style.containerSelectIcon}>
              <View style={style.selectIcon}>
                <MaterialIcons name="category" size={19} color={theme.button.primary} />
              </View>
              <CategorySelection />
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={19} color={theme.text.primary} />
          </TouchableOpacity>

          <View style={style.containerInput}>
            <CustomInput
              icon={<AntDesign name="calendar" size={20} color={theme.button.primary} />}
              onChangeText={(text) => { props.setPaidDate(text) }}
              value={props.paidDate}
              style={style.input}
              styleInput={style.inputText}
              placeholder="Data de pagamento"
              placeholderTextColor="#b3b3b3"
              mask='custom'
              maskCustom='99/99/9999'
              keyboard='numeric'
              onPressIcon={() => setDatePickerVisibility(true)}
            />
          </View>

          <View style={[style.containerInput, { marginLeft: 22, marginTop: 0 }]}>
            <BouncyCheckbox
              onPress={() => { props.setIsPaid(!props.isPaid) }}
              text={"Foi pago"}
              textStyle={style.checkText}
              fillColor={theme.button.primary}
              style={{ marginTop: 20 }}
              isChecked={props.isPaid}
              disableBuiltInState={true}
            />
          </View>

        </KeyboardAvoidingView>
      </ScrollView>

      <Modal
        transparent={true}
        visible={openOptions}
        onRequestClose={() => {
          setOpenOptions(false);
          setOptionsType("");
        }}
      >
        <View style={style.backdrop} onTouchEnd={() => { setOpenOptions(false); setOptionsType("") }} />
        <View style={[style.modal, !optionsType?.length ? style.modalOption : {}]}>

          {!optionsType?.length && (
            <Options />
          )}
          {(optionsType == "Category") && (
            <CategoryScreen
              selectCategory={category => {
                props.setBill(undefined)
                props.setCategory(category);
                setOpenOptions(false);
                setOptionsType("")
              }}
              close={() => {
                setOpenOptions(false);
                setOptionsType("")
              }}
            />
          )}
          {(optionsType == "Bill") && (
            <ScrollView>
              {DEBTS_INSTITUTION.map((debit, i) => (
                <Debts key={i} debit={debit} />
              ))}
            </ScrollView>
          )}
        </View>
      </Modal>

      <DatetimePicker
        isDatePickerVisible={isDatePickerVisible}
        onChange={(date) => {
          setDatePickerVisibility(false);
          if (!date) return
          props.setPaidDate(getPipeCustomDateString(date.getTime(), "DD/MM/YYYY"))
        }}
      />
    </View>
  );
}

export default FinanceDetails;