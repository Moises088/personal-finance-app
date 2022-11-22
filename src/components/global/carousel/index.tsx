import React from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from './styles';
import { ThemeContext } from '../../../contexts/themeContext';
import { CarouselProps } from '../../../interfaces/screens/carousel.interface';

const Carousel: React.FC<CarouselProps> = ({ itens, width }) => {

    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    const scrollRef = React.useRef<any>();

    return (
        <View style={style.container}>
            <View style={style.containerCarouselMonth}>
                <View style={style.carouselMonth}>
                    <ScrollView
                        horizontal={true}
                        scrollEventThrottle={200}
                        decelerationRate={0}
                        pagingEnabled
                        snapToInterval={width}
                        ref={scrollRef}
                    >
                        {itens.map(item => (item))}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

export default Carousel;