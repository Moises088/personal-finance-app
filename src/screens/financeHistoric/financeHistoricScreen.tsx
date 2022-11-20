import React from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext';
import { styles } from './styles';
import { WINDOW_WIDTH } from '../../constants/screen.contants';
import { AppFinanceService } from '../../services/finance';
import CarouselDatePicker from '../../components/global/carousel-date-picker/carouselDatePicker';
import { FinanceBalance } from '../../interfaces/services/finance.interface';

const FinanceHistoricScreen: React.FC = () => {

    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    const [finances, setFinances] = React.useState<FinanceBalance>()

    const getFinances = async (activeMonth: string) => {
        const [month, year] = activeMonth.split("-");
        const getFinancesBalance = await AppFinanceService.getFinancesBalance(month, year, 1);
        setFinances(getFinancesBalance)
    }

    return (
        <View style={style.container}>
            <ScrollView>
                <CarouselDatePicker onChangeDate={getFinances} />

            </ScrollView>
        </View>
    );
}

export default FinanceHistoricScreen;