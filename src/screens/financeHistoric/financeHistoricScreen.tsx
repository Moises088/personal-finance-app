import React from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext';
import { styles } from './styles';
import { AppFinanceService } from '../../services/finance';
import CarouselDatePicker from '../../components/global/carousel-date-picker';
import { FinanceBalance } from '../../interfaces/services/finance.interface';
import DonutChart from '../../components/global/donut-chart';
import { COLOR_DANGER, COLOR_SUCCESS } from '../../constants/colors';
import { WINDOW_WIDTH } from '../../constants/screen.contants';

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
            <ScrollView style={{ flex: 1 }}>
                <CarouselDatePicker onChangeDate={getFinances} />
                <View style={style.containerChart}>
                    <DonutChart
                        radius={(WINDOW_WIDTH - 50) / 2}
                        strokeWidth={20}
                        color={COLOR_SUCCESS}
                        strokeColor={theme.background.secondary}
                        total={20}
                    />

                    <View style={style.containerChartInside}>
                        <DonutChart
                            radius={(WINDOW_WIDTH - 86) / 2}
                            strokeWidth={20}
                            color={COLOR_DANGER}
                            strokeColor={theme.background.secondary}
                            total={80}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default FinanceHistoricScreen;