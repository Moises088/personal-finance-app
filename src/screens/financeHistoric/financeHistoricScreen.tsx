import React from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { ThemeContext } from '../../contexts/themeContext';
import { CHART_STROKE, CHART_WIDTH, styles } from './styles';
import { AppFinanceService } from '../../services/finance';
import CarouselDatePicker from '../../components/global/carousel-date-picker';
import { FinanceBalance } from '../../interfaces/services/finance.interface';
import DonutChart from '../../components/global/donut-chart';
import { COLOR_DANGER, COLOR_SUCCESS } from '../../constants/colors';
import { getPipeMoneyString } from '../../utils/money.util';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import BudgetPopup from '../../components/budget/budget-popup';

const FinanceHistoricScreen: React.FC = () => {

    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    const [finances, setFinances] = React.useState<FinanceBalance>()

    const getFinances = async (activeMonth: string) => {
        const [month, year] = activeMonth.split("-");
        const getFinancesBalance = await AppFinanceService.getFinancesBalance(month, year, 1);
        setFinances(getFinancesBalance);
    }

    const getFinancePercente = (balance: number | undefined): number => {
        if (!finances || !balance) return 0;
        const total = finances.totalIncome + finances.totalExpense;
        return (balance * 100) / total;
    }

    return (
        <View style={style.container}>
            <ScrollView style={{ flex: 1 }}>
                <CarouselDatePicker onChangeDate={getFinances} />
                <View style={style.containerChart}>
                    <DonutChart
                        radius={CHART_WIDTH / 2}
                        strokeWidth={CHART_STROKE}
                        color={COLOR_SUCCESS}
                        strokeColor={theme.background.secondary}
                        total={getFinancePercente(finances?.totalIncome)}
                    />

                    <View style={style.containerChartInside}>
                        <DonutChart
                            radius={(CHART_WIDTH - (CHART_STROKE * 2)) / 2}
                            strokeWidth={CHART_STROKE}
                            color={COLOR_DANGER}
                            strokeColor={theme.background.secondary}
                            total={getFinancePercente(finances?.totalExpense)}
                        />
                    </View>

                    <View style={style.containerChartValue}>
                        <Text numberOfLines={1} style={style.titleMoney}>R$ {getPipeMoneyString(finances?.total)}</Text>
                    </View>
                </View>

                <View style={style.containerBalance}>
                    <View style={style.containerBalanceValue}>
                        <Feather name="trending-up" size={18} color={COLOR_SUCCESS} />
                        <Text style={[style.balanceValue, { color: COLOR_SUCCESS }]}>R$ {getPipeMoneyString(finances?.totalIncome)}</Text>
                    </View>
                    <View style={style.containerBalanceValue}>
                        <Feather name="trending-down" size={18} color={COLOR_DANGER} />
                        <Text style={[style.balanceValue, { color: COLOR_DANGER }]}>-R$ {getPipeMoneyString(finances?.totalExpense)}</Text>
                    </View>
                </View>

                <View style={style.content}>
                    <BudgetPopup />
                    <View style={{ marginTop: 20 }} />
                    {finances?.finances?.map((finance, i) => (
                        <TouchableOpacity key={i}>
                            <View style={style.itens}>
                                <View style={style.itemContainer}>
                                    <View style={style.itemIcon}>
                                        <FontAwesome5 name={finance.category?.icon} color={theme.text.primary} size={20} />
                                    </View>
                                    <Text style={style.itemTitle}>{finance.name}</Text>
                                </View>

                                <View style={{ alignItems: "flex-end" }}>
                                    <Text style={[style.itemValue, { color: finance.type == "INCOME" ? theme.text.primary : COLOR_DANGER }]}>
                                        {finance.type == "INCOME" ? "+" : "-"} R$ {getPipeMoneyString(finance.value)}
                                    </Text>
                                    <Feather
                                        name={finance.type == "INCOME" ? "trending-up" : "trending-down"}
                                        size={15}
                                        color={finance.type == "INCOME" ? COLOR_SUCCESS : COLOR_DANGER}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

export default FinanceHistoricScreen;