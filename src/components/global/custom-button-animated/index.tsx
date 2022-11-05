import React from 'react';
import { Animated, GestureResponderEvent, Modal, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { ThemeContext } from '../../../contexts/themeContext';
import { CustomButtonAnimatedProps } from '../../../interfaces/screens/custom-button.interface';
import { styles } from './styles';

const CustomButtonAnimated: React.FC<CustomButtonAnimatedProps> = (props) => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const [animatedText, setAnimatedText] = React.useState<any[]>([]);
  const [animatedDots, setAnimatedDots] = React.useState({
    one: new Animated.Value(0),
    two: new Animated.Value(0),
    three: new Animated.Value(0)
  });
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [animatedStep, setAnimatedStep] = React.useState<'start' | 'loading' | 'done' | 'error'>('start');

  React.useEffect(() => {
    const animateds = animatedText.map(v => v)
    props.buttonText.trim().split("").forEach((_, i) => {
      animateds[i] = new Animated.Value(1)
    })

    setAnimatedText(animateds)
  }, []);

  const animateText = (toValue = 0) => {
    const animations = props.buttonText.trim().split("").map((_, i) => {
      return Animated.timing(animatedText[i], {
        toValue,
        useNativeDriver: true,
        duration: 100
      })
    })

    Animated.stagger(20, animations).start()
  }

  const onAnimateDots = (animation: Animated.Value, nextAnimation: () => void) => {
    Animated.sequence([
      Animated.timing(animation, {
        toValue: -4,
        duration: 150,
        useNativeDriver: true
      }),
      Animated.timing(animation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      })
    ]).start();

    setTimeout(() => {
      nextAnimation()
    }, 150);
  }

  const animateDots = () => {
    const onThreeAnimation = () => {
      onAnimateDots(animatedDots.three, animateDots);
    }
    const onTwoAnimation = () => {
      onAnimateDots(animatedDots.two, onThreeAnimation);
    }
    onAnimateDots(animatedDots.one, onTwoAnimation);
  }

  const onPress = async (event: GestureResponderEvent) => {
    setDisabled(true)
    animateText()
    await new Promise((resolve) => setTimeout(resolve, (100 + (props.buttonText.length * 20))));
    setAnimatedStep('loading')
    animateDots()
    props.onPress(event)
  }

  const callback = () => {
    setAnimatedStep('start');
    animateText(1);
    setDisabled(false);
  }

  React.useMemo(() => {
    if (animatedStep == "loading") callback()
  }, [props.loadingEnd])

  return (
    <>
      <Modal visible={disabled} transparent={true} />
      <TouchableOpacity
        activeOpacity={0.7}
        style={[style.btnContainer, { backgroundColor: props.background }]}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={style.textContainer}>
          {animatedStep == 'start' && (
            <View style={style.wordContainer}>
              {props.buttonText.trim().split("").map((word, index) => (
                <Animated.Text
                  key={`${word}-${index}`}
                  style={[style.text, { opacity: animatedText[index] }]}
                >
                  {word}
                </Animated.Text>
              ))}
            </View>
          )}

          {animatedStep == 'loading' && (
            <View style={style.containerDots}>
              <Animated.View style={[style.dot, { transform: [{ translateY: animatedDots.one }] }]} />
              <Animated.View style={[style.dot, { transform: [{ translateY: animatedDots.two }] }]} />
              <Animated.View style={[style.dot, { transform: [{ translateY: animatedDots.three }] }]} />
            </View>
          )}
        </View>
      </TouchableOpacity >
    </>
  );
}

export default CustomButtonAnimated;