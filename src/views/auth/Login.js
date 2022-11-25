import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import post_auth from '../../services/apis/auth/post_auth';
import usePacientes from '../../hooks/usePacientes';
import { emailRegex } from '../../constants';
import { colorInputPlaceholder } from '../../styles/colors';
import get_auth from '../../services/apis/auth/get_auth';
import globalStyles from '../../styles/globalStyles';

const Login = () => {
  // Estados
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [autenticado, setAutenticado] = useState(false);

  // usePacientes
  const { setAuth } = usePacientes();

  // useNavigation
  const { navigate } = useNavigation();

  // resetCampos
  const resetCampos = () => {
    setEmail('');
    setPassword('');
  };

  // effect resetCampos
  useEffect(() => {
    resetCampos();
  }, []);

  // effect autenticado
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('apv-token');
      if (token) {
        setAutenticado(true);
        try {
          const data = await get_auth({ token });
          setAuth({ token, user: data });
          navigate('Home');
        } catch (error) {
          console.log(error);
          await AsyncStorage.clear();
        }

        setAutenticado(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Press Login
  const handlePressLogin = async () => {
    // Validar
    if (email === '' || password === '') {
      Alert.alert('Error', 'Todos los campos son requeridos');
      return;
    }

    // Validar email
    if (!emailRegex.test(email)) {
      Alert.alert('Email Inválido', 'El email no es válido');
      return;
    }

    setCargando(true);

    // Enviar datos al servidor
    try {
      const data = await post_auth({ email, password });

      if (data.msg) {
        Alert.alert('Autenticación', data.msg);
      } else {
        // Resetear los campos
        resetCampos();
        const { token } = data;
        // Guardar token en AsyncStorage
        await AsyncStorage.setItem('apv-token', token);
        // Guardar usuario en el estado
        setAuth(data);
        // Navegar a Home
        navigate('Home');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ups', 'Ocurrio un error al iniciar sesión');
    }
    setCargando(false);
  };

  // Autenticando
  if (autenticado) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <View style={globalStyles.box}>
          <Text style={globalStyles.titulo}>
            Pacientes de{' '}
            <Text style={globalStyles.tituloBold}>Veterinaria</Text>
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.box}>
        <Text style={globalStyles.titulo}>
          Pacientes de <Text style={globalStyles.tituloBold}>Veterinaria</Text>
        </Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor={colorInputPlaceholder}
          value={email}
          onChangeText={text => setEmail(text.trim())}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Password"
          textContentType="password"
          placeholderTextColor={colorInputPlaceholder}
          value={password}
          onChangeText={text => setPassword(text.trim())}
        />
        <Pressable style={globalStyles.btn}>
          <Text style={globalStyles.btnText} onPress={() => handlePressLogin()}>
            {cargando ? 'Autenticando..' : 'Iniciar Sesión'}
          </Text>
        </Pressable>

        <View style={globalStyles.flex}>
          <Text style={globalStyles.text}>¿No Tienes una Cuenta? </Text>
          <Pressable onPress={() => navigate('Registro')}>
            <Text style={globalStyles.btnBold}>Registrate</Text>
          </Pressable>
        </View>

        <View style={globalStyles.flex}>
          <Pressable onPress={() => navigate('OlvidePassword')}>
            <Text style={globalStyles.btnBold}>Recuperar Contraseña</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
