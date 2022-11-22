import React from 'react';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { View, Modal, Text, ScrollView, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { PickerProps } from '../../../interfaces/screens/picker.interface';
import { styles } from './styles';

const GlobalPicker: React.FC<PickerProps> = ({ itens, setSelectedItem, selectedItem, visible, textStyle, containerStyle }) => {

    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    const [visibleModal, setVisibleModal] = React.useState<boolean>(visible)
    const [toggleCheckBox, setToggleCheckBox] = React.useState<string>(selectedItem);

    React.useEffect(() => {
        setToggleCheckBox(selectedItem)
    }, [selectedItem])

    const setCheckBox = (value: string) => {
        setToggleCheckBox(value);
        setTimeout(() => {
            setVisibleModal(false)
            setSelectedItem(value)
        }, 50);
    }

    const findLabel = (value: string) => {
        return itens.find(item => item.value == value)?.label ?? ""
    }

    return (
        <>
            <TouchableOpacity style={[style.containerValue, containerStyle ?? {}]} onPress={() => setVisibleModal(true)}>
                <Text style={[style.text, textStyle ?? {}]}>{findLabel(toggleCheckBox)}</Text>
                <MaterialIcons name="keyboard-arrow-down" style={{ marginTop: 3 }} size={18} color={theme.text.primary} />
            </TouchableOpacity>

            <Modal visible={visibleModal} transparent={true}>
                <View style={style.backdrop} onTouchEnd={() => setVisibleModal(false)} />
                <View style={style.containerModal}>
                    <ScrollView>
                        <Text style={style.title}>Selecione</Text>
                        {itens.map((item, index) => (
                            <BouncyCheckbox
                                onPress={() => setCheckBox(item.value)}
                                text={item.label}
                                textStyle={style.checkText}
                                fillColor={theme.button.primary}
                                style={{ marginTop: 20 }}
                                key={index}
                                isChecked={item.value == toggleCheckBox}
                                disableBuiltInState={true}
                            />
                        ))}
                    </ScrollView>
                </View>
            </Modal>
        </>
    );
}

export default GlobalPicker;