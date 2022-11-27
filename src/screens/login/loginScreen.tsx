import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../../components/global/custom-input';
import { ThemeContext } from '../../contexts/themeContext';
import { Entypo } from '@expo/vector-icons';
import { styles } from './styles';
import CustomButton from '../../components/global/custom-button';
import { AuthContext } from '../../contexts/authContext';

const LoginScreen: React.FC = () => {

  const { theme } = React.useContext(ThemeContext);
  const style = styles(theme);

  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const { login, loginWithoutAccount } = React.useContext(AuthContext)

  return (
    <SafeAreaView style={style.container}>
      <View style={style.ballLayout} />
      <View style={style.ballLayoutSecondary} />

      <View style={style.containerLogin}>

        <Text style={style.title}>Login</Text>

        <CustomInput
          icon={<Entypo name="email" size={18} color="black" />}
          keyboard='email-address'
          placeholder="E-mail"
          autoCapitalize='none'
          onChangeText={text => setEmail(text)}
        />
        <CustomInput
          icon={<Entypo name="lock" size={18} color="black" />}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />

        <View style={style.containerButtons}>
          <CustomButton
            buttonText='Enviar'
            customStyle="btn"
            onPress={() => login(email, password)}
          />
          <CustomButton
            buttonText='Continuar sem conta'
            customStyle="outline"
            onPress={loginWithoutAccount}
            style={{ marginTop: 20 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;