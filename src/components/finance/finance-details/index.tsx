import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import CustomInput from '../../global/custom-input';
import { styles } from './styles';
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import CategoryScreen from '../../../screens/category/categoryScreen';
import { CategoryEntity } from '../../../interfaces/services/category.interface';

const FinanceDetails: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const [openCategory, setOpenCategory] = React.useState<boolean>(false);
  const [category, setCategory] = React.useState<CategoryEntity>();

  const CategorySelection: React.FC = () => {
    if (!category) return <Text style={style.selectText}>Categoria</Text>
    return (
      <>
        <FontAwesome5 name={category.icon} color={theme.text.primary} size={17} style={{ marginLeft: 10 }} />
        <Text style={style.selectText}>{category.name}</Text>
      </>
    )
  }

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

      <Modal transparent={true} visible={openCategory} onRequestClose={() => { setOpenCategory(false) }}>
        <View style={style.backdrop} />
        <View style={style.modal}>
          <CategoryScreen selectCategory={category => {
            setCategory(category);
            setOpenCategory(false);
          }} />
        </View>
      </Modal>
    </View>
  );
}

export default FinanceDetails;