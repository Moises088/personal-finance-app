import React from 'react';
import { View, Platform, TouchableOpacity, Text } from 'react-native';
import { DateTimePickerProps } from '../../../interfaces/screens/datetime-picker.interface';
import { ThemeContext } from '../../../contexts/themeContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './styles';

const DatetimePicker: React.FC<DateTimePickerProps> = (props) => {

    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    return props.isDatePickerVisible ? (
        <View>
            <DateTimePicker
                value={props.dateActive ? props.dateActive : new Date()}
                mode="date"
                display={Platform.OS == "android" ? "default" : "inline"}
                onChange={(_, date) => props.onChange(date)}
                locale="pt-BR"
            />
        </View>
    ) : <View />;
}

export default DatetimePicker;