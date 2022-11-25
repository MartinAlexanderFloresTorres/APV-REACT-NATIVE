import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import usePacientes from '../../hooks/usePacientes';
import put_perfil from '../../services/apis/auth/put_perfil';
import { emailRegex, webRegex } from '../../constants';
import globalStyles from '../../styles/globalStyles';
import { colorInputPlaceholder } from '../../styles/colors';

const UpdatePerfil = () => {
  // Estados
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [web, setWeb] = useState('');
  const [cargando, setCargando] = useState(false);

  // usePacientes
  const { auth, setAuth } = usePacientes();

  // useNavigation
  const { navigate } = useNavigation();

  // resetCampos
  const resetCampos = () => {
    setNombre('');
    setEmail('');
    setTelefono('');
    setWeb('');
  };

  // effect resetCampos
  useEffect(() => {
    setNombre(auth.user.nombre);
    setEmail(auth.user.email);
    setTelefono(auth.user.telefono ?? '');
    setWeb(auth.user.web ?? '');
  }, [auth]);

  // Handle Press update Perfil
  const handlePressUpdate = async () => {
    // Validar
    if (nombre === '' || email === '') {
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

    if (telefono.length > 0) {
      // Validar teléfono
      if (telefono.trimEnd().length < 9 || telefono.length > 16) {
        Alert.alert('Teléfono Inválido', 'El teléfono no es válido');
        return;
      }
      if (
        (isNaN(telefono) && !telefono.includes(' ')) ||
        telefono.includes('-')
      ) {
        Alert.alert(
          'Teléfono Inválido',
          '"El numero de teléfono que a ingresado no debe contener caracteres especiales",',
        );
        return;
      }
    }

    if (web.length > 0) {
      // Validar web con regex
      if (!webRegex.test(web)) {
        Alert.alert('Web Inválida', 'La web no es válida');
        return;
      }
    }

    // Enviar datos al servidor
    setCargando(true);
    try {
      const data = await put_perfil({
        id: auth.user._id,
        nombre,
        email,
        telefono,
        web,
        token: auth.token,
      });

      if (data.msg) {
        Alert.alert('Perfil', data.msg);
      } else {
        Alert.alert('Perfil', 'Perfil actualizado correctamente');
        resetCampos();
        // Actualizar auth
        setAuth({
          token: auth.token,
          user: data,
        });
        // Navegar a inicio
        navigate('Home');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ups', 'Ocurrio un error al Actualizar el Perfil');
    }
    setCargando(false);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <View style={globalStyles.box}>
          <Text style={globalStyles.titulo}>
            Editar <Text style={globalStyles.tituloBold}>Perfil</Text>
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
            placeholder="Teléfono"
            keyboardType="phone-pad"
            placeholderTextColor={colorInputPlaceholder}
            value={telefono}
            onChangeText={text => setTelefono(text.trim())}
          />
          <TextInput
            style={globalStyles.input}
            placeholder="Web"
            keyboardType="url"
            textContentType="URL"
            placeholderTextColor={colorInputPlaceholder}
            value={web}
            onChangeText={text => setWeb(text.trim())}
          />

          <Pressable style={globalStyles.btn} onPress={handlePressUpdate}>
            <Text style={globalStyles.btnText}>
              {cargando ? 'Actualizando...' : 'Actualizar Perfil'}
            </Text>
          </Pressable>

          <Pressable
            style={globalStyles.flex}
            onPress={() => navigate('UpdatePassword')}
          >
            <Text style={globalStyles.btnBold}>¿Cambiar contraseña?</Text>
          </Pressable>

          <Pressable onPress={() => navigate('Home')}>
            <Text style={globalStyles.btnBold}>Volver al inicio</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdatePerfil;
