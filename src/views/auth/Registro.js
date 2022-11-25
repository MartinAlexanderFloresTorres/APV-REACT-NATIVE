import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import post_register from '../../services/apis/auth/post_register';
import { emailRegex } from '../../constants';
import globalStyles from '../../styles/globalStyles';
import { colorInputPlaceholder } from '../../styles/colors';

const Registro = () => {
  // Estados
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [cargando, setCargando] = useState(false);

  // useNavigation
  const { navigate } = useNavigation();

  // resetCampos
  const resetCampos = () => {
    setNombre('');
    setEmail('');
    setPassword('');
    setRepeatPassword('');
  };

  // effect resetCampos
  useEffect(() => {
    resetCampos();
  }, []);

  // Handle Press Registro
  const handlePressRegistro = async () => {
    // Validar
    if (nombre === '' || email === '' || password === '') {
      Alert.alert('Validación', 'Todos los campos son requeridos');
      return;
    }

    if (nombre.length < 3) {
      Alert.alert('Validación', 'El nombre debe tener al menos 3 caracteres');
      return;
    }

    if (nombre.length > 20) {
      Alert.alert('Validación', 'El nombre debe tener máximo 20 caracteres');
      return;
    }

    // Validar email
    if (!emailRegex.test(email)) {
      Alert.alert('Email Inválido', 'El email no es válido');
      return;
    }

    if (password !== repeatPassword) {
      Alert.alert('Validación', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Validación',
        'La contraseña debe tener al menos 6 caracteres',
      );
      return;
    }

    // Enviar datos al servidor
    setCargando(true);
    try {
      const data = await post_register({ nombre, email, password });

      Alert.alert('Registro', data.msg);

      if (data.msg.includes('correctamente')) {
        // Resetear los campos
        resetCampos();
        // Navegar a Login
        navigate('Login');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ups', 'Ocurrio un error al registrar');
    }
    setCargando(false);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <View style={globalStyles.box}>
          <Text style={globalStyles.titulo}>
            Crea tu <Text style={globalStyles.tituloBold}>Cuenta</Text>
          </Text>

          <TextInput
            style={globalStyles.input}
            placeholder="Nombre"
            placeholderTextColor={colorInputPlaceholder}
            value={nombre}
            onChangeText={text => setNombre(text.trimStart())}
          />
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
          <TextInput
            style={globalStyles.input}
            placeholder="Repetir Password"
            textContentType="password"
            placeholderTextColor={colorInputPlaceholder}
            value={repeatPassword}
            onChangeText={text => setRepeatPassword(text.trim())}
          />

          <Pressable style={globalStyles.btn} onPress={handlePressRegistro}>
            <Text style={globalStyles.btnText}>
              {cargando ? 'Creando Cuenta...' : 'Crear Cuenta'}
            </Text>
          </Pressable>

          <View style={globalStyles.flex}>
            <Text style={globalStyles.text}>¿Ya Tienes una Cuenta? </Text>
            <Pressable onPress={() => navigate('Login')}>
              <Text style={globalStyles.btnBold}>Inicia Sesión</Text>
            </Pressable>
          </View>

          <Pressable onPress={() => navigate('OlvidePassword')}>
            <Text style={globalStyles.btnBold}>
              ¿Has olvidado la contraseña?
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Registro;
