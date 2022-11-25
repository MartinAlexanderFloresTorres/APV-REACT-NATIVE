/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Modal,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import Formulario from '../../components/Formulario';
import Paciente from '../../components/Paciente';
import PacienteInfo from '../../components/PacienteInfo';
import usePacientes from '../../hooks/usePacientes';
import Header from '../../components/interface/Header';
import get_pacientes from '../../services/apis/clientes/get_pacientes';
import {
  colorBorder,
  colorContainer,
  colorPrimary,
  colorWhite,
} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';
import { Path, Svg } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  // Estados
  const [cargando, setCargando] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // useNavigation
  const { navigate } = useNavigation();

  // usePacientes
  const {
    isModalPaciente,
    handleVisibleModal,
    handleNoVisibleModal,
    isModalInfo,
    auth,
    pacientes,
    setPacientes,
    handleLogout,
  } = usePacientes();

  // effecto de traer pacientes
  useEffect(() => {
    // Traer pacientes
    (async () => {
      setCargando(true);
      try {
        if (auth.token) {
          const data = await get_pacientes({ token: auth.token });
          setPacientes(data);
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'No se pudo traer los pacientes');
      }
      setCargando(false);
      setRefreshing(false);
    })();
  }, [refreshing]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header />
      <View style={styles.contenedor}>
        <Pressable onPress={handleVisibleModal} style={globalStyles.btn}>
          <Text style={globalStyles.btnText}>Agregar Paciente</Text>
        </Pressable>
      </View>

      {cargando ? (
        <View style={globalStyles.container}>
          <Text style={styles.encabezado}>Obteniendo Pacientes...</Text>
        </View>
      ) : pacientes.length === 0 ? (
        <View style={globalStyles.container}>
          <Text style={styles.encabezado}>No hay pacientes aun</Text>
        </View>
      ) : (
        <FlatList
          style={styles.lista}
          data={pacientes}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <Paciente item={item} />}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
        />
      )}

      <View style={styles.navegacion}>
        <Pressable style={styles.boton} onPress={() => navigate('Perfil')}>
          <Svg
            style={styles.btnSvg}
            width={30}
            height={30}
            fill="none"
            stroke={colorPrimary}
            viewBox="0 0 24 24"
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </Svg>
          <Text style={styles.btnText}>Mis Datos</Text>
        </Pressable>
        <Pressable
          style={styles.boton}
          onPress={() => navigate('UpdatePerfil')}
        >
          <Svg
            style={styles.btnSvg}
            width={30}
            height={30}
            fill="none"
            stroke={colorPrimary}
            viewBox="0 0 24 24"
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </Svg>
          <Text style={styles.btnText}>Update</Text>
        </Pressable>

        <Pressable
          style={styles.boton}
          onPress={() => navigate('UpdatePassword')}
        >
          <Svg
            style={styles.btnSvg}
            width={30}
            height={30}
            fill="none"
            stroke={colorPrimary}
            viewBox="0 0 24 24"
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </Svg>
          <Text style={styles.btnText}>Password</Text>
        </Pressable>

        <Pressable
          style={styles.boton}
          onPress={() => {
            handleLogout();
            navigate('Login');
          }}
        >
          <Svg
            style={styles.btnSvg}
            width={30}
            height={30}
            fill="none"
            stroke={colorPrimary}
            viewBox="0 0 24 24"
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </Svg>
          <Text style={styles.btnText}>Logout</Text>
        </Pressable>
      </View>

      <Modal animationType="slide" visible={isModalPaciente}>
        <Formulario handleNoVisibleModal={handleNoVisibleModal} />
      </Modal>

      <Modal animationType="slide" visible={isModalInfo}>
        <PacienteInfo />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  encabezado: {
    marginHorizontal: 20,
    backgroundColor: colorContainer,
    padding: 20,
    borderWidth: 1,
    borderColor: colorBorder,
    color: colorWhite,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
  },
  lista: {
    marginHorizontal: 20,
  },
  navegacion: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: colorBorder,
  },
  boton: {
    backgroundColor: colorContainer,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnSvg: {
    width: 30,
    marginBottom: 5,
  },
  btnText: {
    color: colorWhite,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Home;
