import React from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from './styles';
import { ThemeContext } from '../../../contexts/themeContext';
import { CarouselProps } from '../../../interfaces/screens/carousel.interface';

const Carousel: React.FC<CarouselProps> = ({ itens, width, onChangeIndex }) => {

    const { theme } = React.useContext(ThemeContext);
    const style = styles(theme);

    const scrollRef = React.useRef<any>();

    const onScroll = (contentOffsetX: number) => {
        if (contentOffsetX % width === 0 || (itens.length - 1) - (contentOffsetX / width) < 0.5) {
            if(onChangeIndex) onChangeIndex(Math.ceil(contentOffsetX / width))
        }
    }

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
                        onScroll={(event) => onScroll(event.nativeEvent.contentOffset.x)}
                    >
                        {itens.map(item => (item))}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

export default Carousel;