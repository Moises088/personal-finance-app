import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import CustomInput from '../../global/custom-input';
import { styles } from './styles';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import CategoryScreen from '../../../screens/category/categoryScreen';
import { AppWalletService } from '../../../services/wallet';
import DatetimePicker from '../../global/datetime-picker';
import { getPipeDateStringPT } from '../../../utils/date.util';
import { FinanceDetailsProps } from '../../../interfaces/screens/finance.interface';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const FinanceDetails: React.FC<FinanceDetailsProps> = (props) => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState<boolean>(false)
  const [openCategory, setOpenCategory] = React.useState<boolean>(false);

  React.useEffect(() => {
    findWallet();
  }, [])

  const findWallet = async () => {
    const getWallet = await AppWalletService.findOne(1);
    props.setWallet(getWallet)
  }

  const CategorySelection: React.FC = () => {
    if (!props.category) return <Text style={style.selectText}>Categoria</Text>
    return (
      <>
        <FontAwesome5 name={props.category.icon} color={theme.text.primary} size={17} style={{ marginLeft: 10 }} />
        <Text style={style.selectText}>{props.category.name}</Text>
      </>
    )
  }

  const WalletSelection: React.FC = () => {
    if (!props.wallet) return <Text style={style.selectText}>Carteira</Text>
    return <Text style={style.selectText}>{props.wallet.name}</Text>
  }

  return (
    <View style={style.container}>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={{ marginBottom: 50 }}>
          <View style={style.containerInput}>
            <CustomInput
              icon={<MaterialIcons name="title" size={20} color={theme.button.primary} />}
              onChangeText={(text) => { props.setTitle(text) }}
              style={style.input}
              styleInput={style.inputText}
              placeholder="Titulo"
              placeholderTextColor="#b3b3b3"
            />
          </View>

          <View style={style.containerInput}>
            <CustomInput
              icon={<MaterialCommunityIcons name="subtitles-outline" size={19} color={theme.button.primary} />}
              onChangeText={(text) => { props.setDescription(text) }}
              style={style.input}
              styleInput={style.inputText}
              placeholder="Descrição"
              placeholderTextColor="#b3b3b3"
            />
          </View>

          <TouchableOpacity style={style.containerSelect} activeOpacity={.5}>
            <View style={style.containerSelectIcon}>
              <View style={style.selectIcon}>
                <Ionicons name="wallet" size={19} color={theme.button.primary} />
              </View>
              <WalletSelection />
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={19} color={theme.text.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[style.containerSelect, props.category ? { backgroundColor: props.category.color } : {}]}
            activeOpacity={.5}
            onPress={() => { setOpenCategory(true) }}
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

      <Modal transparent={true} visible={openCategory} onRequestClose={() => { setOpenCategory(false) }}>
        <View style={style.backdrop} />
        <View style={style.modal}>
          <CategoryScreen selectCategory={category => {
            props.setCategory(category);
            setOpenCategory(false);
          }} />
        </View>
      </Modal>

      <DatetimePicker
        isDatePickerVisible={isDatePickerVisible}
        onChange={(date) => {
          setDatePickerVisibility(false);
          if (!date) return
          props.setPaidDate(getPipeDateStringPT(date.getTime()))
        }}
      />
    </View>
  );
}

export default FinanceDetails;