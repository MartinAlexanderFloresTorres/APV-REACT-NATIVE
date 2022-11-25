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
import globalStyles from '../../styles/globalStyles';
import { emailRegex } from '../../constants';
import post_recuperacion from '../../services/apis/auth/post_recuperacion';
import { colorInputPlaceholder } from '../../styles/colors';

const OlvidePassword = () => {
  // Estados
  const [email, setEmail] = useState('');
  const [cargando, setCargando] = useState(false);

  // useNavigation
  const { navigate } = useNavigation();

  // efecto resetCampos
  useEffect(() => {
    setEmail('');
  }, []);

  // Handle Press recuperar
  const handlePressRecuperacion = async () => {
    // Validar
    if (email === '') {
      Alert.alert('Email Requerido', 'El campo email es requerido');
      return;
    }

    // Validar email
    if (!emailRegex.test(email)) {
      Alert.alert('Email Inválido', 'El email no es válido');
      return;
    }

    setCargando(true);
    try {
      const data = await post_recuperacion({ email });

      Alert.alert('Recuperación', data.msg);

      if (data.msg.includes('instruciones')) {
        navigate('Login');
        setEmail('');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Ocurrió un error al recuperar la contraseña');
    }

    setCargando(false);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.box}>
        <Text style={globalStyles.titulo}>
          Recupera tu <Text style={globalStyles.tituloBold}> Acceso</Text>
        </Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor={colorInputPlaceholder}
          value={email}
          onChangeText={text => setEmail(text.trim())}
        />
        <Pressable style={globalStyles.btn}>
          <Text
            style={globalStyles.btnText}
            onPress={() => handlePressRecuperacion()}
          >
            {cargando ? 'Recuperando..' : 'Enviar Instrucciones'}
          </Text>
        </Pressable>

        <View style={globalStyles.flex}>
          <Pressable onPress={() => navigate('Registro')}>
            <Text style={globalStyles.btnBold}>Crear cuenta nueva</Text>
          </Pressable>
        </View>

        <View style={globalStyles.flex}>
          <Pressable onPress={() => navigate('Login')}>
            <Text style={globalStyles.btnBold}>Volver al inicio de sesión</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OlvidePassword;
