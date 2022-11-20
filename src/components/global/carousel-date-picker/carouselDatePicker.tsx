import React from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { WINDOW_WIDTH } from '../../../constants/screen.contants';
import { FinancesContext } from '../../../contexts/financesContext';
import { ThemeContext } from '../../../contexts/themeContext';
import { DATE_MONTH, DATE_YEAR } from '../../../constants/date.constants';

const WIDTH_ITEM = ((WINDOW_WIDTH - 76) / 2);

const CarouselDatePicker: React.FC<{ onChangeDate(date: string): void }> = ({ onChangeDate }) => {

    const { filteredMonth, filteredYear } = React.useContext(FinancesContext);
    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    const [months, setMonths] = React.useState<{ label: string; date: string }[]>([])
    const [offsetX, setOffsetX] = React.useState<number>(0)
    const [activeMonth, setActiveMonth] = React.useState<string>()

    const scrollRef = React.useRef<any>();

    React.useEffect(() => {
        getMonths()
    }, [])

    const getMonths = () => {
        const getMonths = []
        for (const year of DATE_YEAR) {
            const getMonth = DATE_MONTH.map(month => ({ label: `${month.label} ${year.label}`, date: `${month.value}-${year.value}` }));
            getMonths.push(...getMonth)
        }

        setMonths(getMonths)
        findAndSetActiveMonth(getMonths, `${filteredMonth}-${filteredYear}`)
    }

    const findAndSetActiveMonth = (getMonths: { label: string; date: string }[], filter: string) => {
        const month = getMonths.find(month => month.date == filter);
        if (month) {
            const index = getMonths.indexOf(month)
            setActiveMonth(month.date)
            setOffsetX(WIDTH_ITEM * index)
            scrollRef?.current?.scrollTo({ x: WIDTH_ITEM * index })
            onChangeDate(month.date)
        }
    }

    const onChangePage = (arrow: "left" | "right") => {
        if (scrollRef.current) {
            if (arrow == "right") {
                if ((WIDTH_ITEM + offsetX) <= WIDTH_ITEM * months.length) {
                    scrollRef.current?.scrollTo({ x: WIDTH_ITEM + offsetX })
                    setOffsetX(WIDTH_ITEM + offsetX)
                }
            }
            if (arrow == "left") {
                if (offsetX > 0) {
                    scrollRef.current?.scrollTo({ x: offsetX - WIDTH_ITEM })
                    setOffsetX(offsetX - WIDTH_ITEM)
                }
            }
        }
    }

    const onScroll = (contentOffsetX: number) => {
        if (contentOffsetX % WIDTH_ITEM === 0) {
            setOffsetX(contentOffsetX)
        }
    }

    return (
        <View style={style.container}>
            <View style={style.headerDate}>
                <TouchableOpacity>
                    <AntDesign name="calendar" size={24} color={theme.button.primary} />
                </TouchableOpacity>
            </View>

            <View style={style.containerCarouselMonth}>
                <TouchableOpacity style={style.carouselMonthArrow} onPress={() => onChangePage("left")}>
                    <Feather name="chevron-left" size={20} style={{ marginLeft: -3 }} color={theme.button.primary} />
                </TouchableOpacity>

                <View style={style.carouselMonth}>
                    <ScrollView
                        horizontal={true}
                        scrollEventThrottle={200}
                        contentContainerStyle={{ width: WIDTH_ITEM * months.length }}
                        pagingEnabled
                        ref={scrollRef}
                        onScroll={(event) => onScroll(event.nativeEvent.contentOffset.x)}
                    >
                        {months.map((month, index) => (
                            <TouchableOpacity key={index} onPress={() => findAndSetActiveMonth(months, month.date)}>
                                <View style={[
                                    style.carouselItem,
                                    { backgroundColor: activeMonth === month.date ? theme.button.primary : "transparent" },
                                    { borderRadius: 20 }
                                ]}>
                                    <Text style={style.carouselItemText}>{month.label}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <TouchableOpacity style={style.carouselMonthArrow} onPress={() => onChangePage("right")}>
                    <Feather name="chevron-right" size={20} style={{ marginLeft: 3 }} color={theme.button.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CarouselDatePicker;