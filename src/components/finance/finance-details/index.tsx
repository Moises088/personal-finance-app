import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import CustomInput from '../../global/custom-input';
import { styles } from './styles';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import CategoryScreen from '../../../screens/category/categoryScreen';
import { CategoryEntity } from '../../../interfaces/services/category.interface';
import { AppWalletService } from '../../../services/wallet';
import { WalletEntity } from '../../../interfaces/services/wallet.interface';
import DatetimePicker from '../../global/datetime-picker';

const FinanceDetails: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState<boolean>(false)
  const [openCategory, setOpenCategory] = React.useState<boolean>(false);
  const [category, setCategory] = React.useState<CategoryEntity>();
  const [wallet, setWallet] = React.useState<WalletEntity>();

  React.useEffect(() => {
    findWallet();
  }, [])

  const findWallet = async () => {
    const getWallet = await AppWalletService.findOne(1);
    setWallet(getWallet)
  }

  const CategorySelection: React.FC = () => {
    if (!category) return <Text style={style.selectText}>Categoria</Text>
    return (
      <>
        <FontAwesome5 name={category.icon} color={theme.text.primary} size={17} style={{ marginLeft: 10 }} />
        <Text style={style.selectText}>{category.name}</Text>
      </>
    )
  }

  const WalletSelection: React.FC = () => {
    if (!wallet) return <Text style={style.selectText}>Carteira</Text>
    return <Text style={style.selectText}>{wallet.name}</Text>
  }

  return (
    <View style={style.container}>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={{ marginBottom: 50 }}>
          <View style={style.containerInput}>
            <CustomInput
              icon={<MaterialIcons name="title" size={20} color={theme.button.primary} />}
              onChangeText={() => { }}
              style={style.input}
              styleInput={style.inputText}
              placeholder="Titulo"
              placeholderTextColor="#b3b3b3"
            />
          </View>

          <View style={style.containerInput}>
            <CustomInput
              icon={<MaterialCommunityIcons name="subtitles-outline" size={19} color={theme.button.primary} />}
              onChangeText={() => { }}
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
            style={[style.containerSelect, category ? { backgroundColor: category.color } : {}]}
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
              onChangeText={() => { }}
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

        </KeyboardAvoidingView>
      </ScrollView>

      <Modal transparent={true} visible={openCategory} onRequestClose={() => { setOpenCategory(false) }}>
        <View style={style.backdrop} />
        <View style={style.modal}>
          <CategoryScreen selectCategory={category => {
            setCategory(category);
            setOpenCategory(false);
          }} />
        </View>
      </Modal>

      <DatetimePicker
        isDatePickerVisible={isDatePickerVisible}
        onChange={(date) => {
          console.log("Date", date);
          setDatePickerVisibility(false)
        }}
      />
    </View>
  );
}

export default FinanceDetails;