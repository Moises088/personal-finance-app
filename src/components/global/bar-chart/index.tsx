import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { BarChartProps } from '../../../interfaces/screens/chart.interface';
import { getPipeMoneyString } from '../../../utils/money.util';
import { styles } from './styles';

const BarChart: React.FC<{ itens: BarChartProps[] }> = (props) => {

    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    const maxHeigth = 200;

    const itens = () => {
        // const itemTotal: BarChartProps = {} as BarChartProps;

        // let max = 0;
        // props.itens.map(item => { max += item.total });

        // itemTotal.color = theme.button.primary;
        // itemTotal.icon = (<Text style={[style.subtitle, { fontSize: 12 }]}>Total</Text>);
        // itemTotal.total = max;

        // if (itemTotal.total && props.itens.length > 1) props.itens.push(itemTotal)

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
            <View style={style.container}>
                {itens().map((item, i) => (
                    <View key={i} style={{ alignItems: 'center', marginRight: 12 }}>
                        {item.icon}
                        <Text style={style.subtitle}>R$ {getPipeMoneyString(item.total)}</Text>
                        <View
                            key={i}
                            style={[style.bar, { height: item.heigth, backgroundColor: item.color }]}
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

export default BarChart;