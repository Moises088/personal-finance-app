import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, KeyboardAvoidingView } from 'react-native';
import CategoryItem from '../../components/category/category-item';
import CustomInput from '../../components/global/custom-input';
import HeaderStack from '../../components/global/header-stack';
import { ThemeContext } from '../../contexts/themeContext';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import CustomButtonAnimated from '../../components/global/custom-button-animated';

const CategoryScreen: React.FC = () => {
    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    const [categories, setCategories] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2]);
    const [openCreateCategory, setOpenCreateCategory] = React.useState<boolean>(false);
    const [loadingEnd, setLoadingEnd] = React.useState<boolean>(false);

    const [title, setTitle] = React.useState<string>();

    const createCategory = async () => {
        
    }

    return (
        <View style={style.container}>
            <HeaderStack title='Categorias' onRequestClose={() => { }} />

            <TouchableOpacity style={style.button} onPress={() => { setOpenCreateCategory(true) }}>
                <Text style={style.buttonText}>+ Nova categoria</Text>
            </TouchableOpacity>

            <FlatList
                data={categories}
                renderItem={() => <CategoryItem />}
            />

            <Modal transparent={true} visible={openCreateCategory}>
                <View style={style.backdrop} />
                <KeyboardAvoidingView behavior="height">
                    <View style={style.modal}>
                        <HeaderStack title='Nova categoria' onRequestClose={() => { setOpenCreateCategory(false) }} />
                        <CustomInput
                            icon={<MaterialIcons name="title" size={20} color={theme.button.primary} />}
                            onChangeText={() => { }}
                            style={style.input}
                            styleInput={style.inputText}
                            placeholder="Titulo"
                            placeholderTextColor="#b3b3b3"
                        />

                        <TouchableOpacity style={style.containerSelect} activeOpacity={.5}>
                            <View style={style.containerSelectIcon}>
                                <View style={style.selectIcon}>
                                    <MaterialIcons name="category" size={19} color={theme.button.primary} />
                                </View>
                                <Text style={style.selectText}>Icone</Text>
                            </View>
                            <MaterialIcons name="keyboard-arrow-right" size={19} color={theme.text.primary} />
                        </TouchableOpacity>

                        <TouchableOpacity style={style.containerSelect} activeOpacity={.5}>
                            <View style={style.containerSelectIcon}>
                                <View style={style.selectIcon}>
                                    <Ionicons name="color-fill-outline" size={19} color={theme.button.primary} />
                                </View>
                                <Text style={style.selectText}>Cor</Text>
                            </View>
                            <MaterialIcons name="keyboard-arrow-right" size={19} color={theme.text.primary} />
                        </TouchableOpacity>

                        <View style={style.containerButton}>
                            <CustomButtonAnimated
                                buttonText='Salvar'
                                background={theme.button.primary}
                                onPress={createCategory}
                                isLoadingButton={true}
                                loadingEnd={loadingEnd}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}

export default CategoryScreen;