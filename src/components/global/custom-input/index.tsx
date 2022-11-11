import React from 'react';
import { View, TextInput, Animated } from 'react-native';
import { TextInputMask, TextInputMaskOptionProp } from 'react-native-masked-text';
import { CustomInputProps } from '../../../interfaces/screens/custom-input.interface';
import styles from './styles';

const CustomInput: React.FC<CustomInputProps> = (props: CustomInputProps) => {

  const scale = React.useRef(new Animated.Value(0.98)).current;
  const spinValue = React.useRef(new Animated.Value(2)).current
  const spin = spinValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['20deg', '-20deg', '0deg']
  })


  const onFocus = (toValue: number) => {
    Animated.timing(scale, {
      toValue,
      useNativeDriver: true,
      duration: 50
    }).start()

    if (toValue < 1) return

    Animated.sequence([
      Animated.timing(spinValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true
      }),
      Animated.timing(spinValue, {
        toValue: 2,
        duration: 250,
        useNativeDriver: true
      })
    ]).start();
  }

  const getOptions = (): TextInputMaskOptionProp | undefined => {
    if (!props.maskCustom?.length) return undefined
    return { mask: props.maskCustom }
  }

  return (
    <Animated.View style={[
      styles.container,
      { transform: [{ scale }] },
      props?.style ? props.style : {}
    ]}>
      <Animated.View style={[
        styles.inputIcon,
        { transform: [{ rotate: spin }] }
      ]}
        onTouchEnd={() => {
          if (props.onPressIcon) {
            props.onPressIcon()
          }
        }}
      >
        {props.icon}
      </Animated.View>

      {props.mask ? (
        <TextInputMask
          style={[styles.input, props?.styleInput ? props.styleInput : {}]}
          placeholder={props.placeholder}
          keyboardType={props.keyboard}
          onBlur={() => onFocus(0.99)}
          onFocus={() => onFocus(1)}
          secureTextEntry={props.secureTextEntry}
          autoCapitalize={props.autoCapitalize}
          onChangeText={text => props.onChangeText(text)}
          value={props.value}
          placeholderTextColor={props.placeholderTextColor}
          type={props.mask}
          options={getOptions()}
        />
      ) : (
        <TextInput
          style={[styles.input, props?.styleInput ? props.styleInput : {}]}
          placeholder={props.placeholder}
          keyboardType={props.keyboard}
          onBlur={() => onFocus(0.99)}
          onFocus={() => onFocus(1)}
          secureTextEntry={props.secureTextEntry}
          autoCapitalize={props.autoCapitalize}
          onChangeText={text => props.onChangeText(text)}
          value={props.value}
          placeholderTextColor={props.placeholderTextColor}
        />
      )}
    </Animated.View>
  );
}

export default CustomInput;