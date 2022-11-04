import React from 'react';
import { View, Text, TouchableOpacity, Modal, KeyboardAvoidingView } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import CustomInput from '../../global/custom-input';
import { styles } from './styles';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import CategoryScreen from '../../../screens/category/categoryScreen';

const FinanceDetails: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  return (
    <View style={style.container}>
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
          <Text style={style.selectText}>Carteira</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={19} color={theme.text.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={style.containerSelect} activeOpacity={.5}>
        <View style={style.containerSelectIcon}>
          <View style={style.selectIcon}>
            <MaterialIcons name="category" size={19} color={theme.button.primary} />
          </View>
          <Text style={style.selectText}>Categoria</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={19} color={theme.text.primary} />
      </TouchableOpacity>

      <Modal transparent={true}>
        <View style={style.backdrop} />
        <KeyboardAvoidingView behavior="height">
          <View style={style.modal}>
            <CategoryScreen />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

export default FinanceDetails;