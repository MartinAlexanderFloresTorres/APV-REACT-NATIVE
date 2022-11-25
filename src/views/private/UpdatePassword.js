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
import globalStyles from '../../styles/globalStyles';
import put_password from '../../services/apis/auth/put_password';
import usePacientes from '../../hooks/usePacientes';
import { colorInputPlaceholder } from '../../styles/colors';

const UpdatePassword = () => {
  // Estados
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNuevo, setPasswordNuevo] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [cargando, setCargando] = useState(false);

  // usePacientes
  const { auth } = usePacientes();

  // useNavigation
  const { navigate } = useNavigation();

  // resetCampos
  const resetCampos = () => {
    setPasswordNuevo('');
    setRepeatPassword('');
    setPasswordActual('');
  };

  // effect resetCampos
  useEffect(() => {
    resetCampos();
  }, []);

  // Handle Press update Password
  const handlePressUpdate = async () => {
    // Validar
    if (
      passwordActual === '' ||
      passwordNuevo === '' ||
      repeatPassword === ''
    ) {
      Alert.alert('Validación', 'Todos los campos son requeridos');
      return;
    }

    if (passwordNuevo !== repeatPassword) {
      Alert.alert('Validación', 'Las contraseñas no coinciden');
      return;
    }

    if (passwordActual.length < 6) {
      Alert.alert(
        'Validación',
        'La contraseña debe tener al menos 6 caracteres',
      );
      return;
    }

    // Enviar datos al servidor
    setCargando(true);
    try {
      const data = await put_password({
        token: auth.token,
        password: passwordActual,
        passwordNuevo,
      });

      Alert.alert('Mensage', data.msg);

      if (data.msg.includes('correctamente')) {
        // Resetear los campos
        resetCampos();
        // Navegar a Login
        navigate('Home');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ups', 'Ocurrio un error al actualizar');
    }
    setCargando(false);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <View style={globalStyles.box}>
          <Text style={globalStyles.titulo}>
            Cambiar <Text style={globalStyles.tituloBold}>Password</Text>
          </Text>

          <TextInput
            style={globalStyles.input}
            placeholder="Password Actual"
            textContentType="password"
            placeholderTextColor={colorInputPlaceholder}
            value={passwordActual}
            onChangeText={text => setPasswordActual(text.trim())}
          />

          <TextInput
            style={globalStyles.input}
            placeholder="Password Nuevo"
            textContentType="password"
            placeholderTextColor={colorInputPlaceholder}
            value={passwordNuevo}
            onChangeText={text => setPasswordNuevo(text.trim())}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Repetir Password"
            textContentType="password"
            placeholderTextColor={colorInputPlaceholder}
            value={repeatPassword}
            onChangeText={text => setRepeatPassword(text.trim())}
          />

          <Pressable style={globalStyles.btn} onPress={handlePressUpdate}>
            <Text style={globalStyles.btnText}>
              {cargando ? 'Guardando...' : 'Guardar nuevo Password'}
            </Text>
          </Pressable>
          <Pressable onPress={() => navigate('Home')}>
            <Text style={globalStyles.btnBold}>Volver al inicio</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdatePassword;
