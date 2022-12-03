import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { WINDOW_WIDTH } from '../../../constants/screen.contants';
import { BarChartProps } from '../../../interfaces/screens/chart.interface';
import { getPipeMoneyString } from '../../../utils/money.util';

const BarChart: React.FC<{ itens: BarChartProps[] }> = (props) => {

    const maxHeigth = 200;

    const itens = () => {
        const totals = props.itens.map(item => item.total);
        const max = Math.max(...totals);

        for (const item of props.itens) {
            const percentage = (item.total) / max;
            item.heigth = Math.round(maxHeigth * percentage);
        }

        return props.itens.sort((a, b) => (b?.heigth ?? 1) - (a?.heigth ?? 1));
    }

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <View style={{ padding: 20, flexDirection: 'row', alignItems: "flex-end" }}>
                {itens().map((item, i) => (
                    <View style={{ alignItems: 'center', marginRight: 12 }}>
                        {item.icon}
                        <Text style={{ fontSize: 10, color: "#FFF", marginBottom: 3, opacity: 0.6 }}>R$ {getPipeMoneyString(item.total)}</Text>
                        <View
                            key={i}
                            style={{ width: 30, height: item.heigth, borderRadius: 8, backgroundColor: item.color }}
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

export default BarChart;