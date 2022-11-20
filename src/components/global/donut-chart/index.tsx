import React from 'react';
import { View, Animated } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { DonutChartProps } from '../../../interfaces/screens/chart.interface';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * 
 * @author based in https://www.youtube.com/watch?v=x2LtzCxbWI0&ab_channel=CatalinMiron
 */

const DonutChart: React.FC<DonutChartProps> = ({ radius, strokeWidth, color, strokeColor, total }) => {

    const animatedValue = React.useRef(new Animated.Value(0)).current;
    const halfCircle = radius + strokeWidth;
    const circleCircumference = 2 * Math.PI * radius;
    const strokeDashoffset = circleCircumference - (circleCircumference * total) / 100;
    const MAX = 100

    const circleRef = React.useRef<{ setNativeProps(props: any): void }>();

    React.useEffect(() => {
        animation(total);

        animatedValue.addListener(callback => {
            if (circleRef.current) {
                const maxTotal = (100 * callback.value) / MAX;
                const strokeDashoffset = circleCircumference - (circleCircumference * maxTotal) / 100;

                circleRef.current.setNativeProps({
                    strokeDashoffset
                })
            }
        })

    }, [total]);

    const animation = (toValue: number) => {
        return Animated.timing(animatedValue, {
            toValue,
            useNativeDriver: true,
            duration: 500
        }).start();
    }

    return (
        <View>
            <Svg
                width={radius * 2}
                height={radius * 2}
                viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
            >
                <G origin={`${halfCircle}, ${halfCircle}`} rotation="-90">
                    <AnimatedCircle
                        cx="50%"
                        cy="50%"
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill={"transparent"}
                        strokeOpacity={0.2}
                    />
                    <AnimatedCircle
                        ref={circleRef}
                        cx="50%"
                        cy="50%"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        r={radius}
                        fill={"transparent"}
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </G>
            </Svg>
        </View>
    );
}

export default DonutChart;