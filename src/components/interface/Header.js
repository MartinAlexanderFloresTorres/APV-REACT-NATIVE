import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Path, Svg } from 'react-native-svg';
import usePacientes from '../../hooks/usePacientes';
import {
  colorBorder,
  colorContainer,
  colorPrimary,
  colorWhite,
} from '../../styles/colors';

const Header = () => {
  // Estados
  const [isModalMenu, setIsModalMenu] = useState(false);

  // useNavigation
  const { navigate } = useNavigation();

  // usePacientes
  const { auth, handleLogout } = usePacientes();

  // Handle visible modal
  const handleVisibleModal = () => {
    setIsModalMenu(true);
  };

  // Handle no visible modal
  const handleNoVisibleModal = () => {
    setIsModalMenu(false);
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.left}>
          <Pressable style={styles.btnIco} onPress={handleVisibleModal}>
            <Svg
              width={30}
              height={30}
              fill="none"
              stroke="#FFF"
              viewBox="0 0 24 24"
            >
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </Svg>
          </Pressable>
          <Text style={styles.titulo}>
            Hola, <Text style={styles.tituloBold}>{auth?.user?.nombre}</Text>
          </Text>
        </View>

        <Pressable
          style={styles.btnIco}
          onPress={() => {
            handleLogout();
            navigate('Login');
          }}
        >
          <Svg
            width={30}
            height={30}
            fill="none"
            stroke="#FFF"
            viewBox="0 0 24 24"
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </Svg>
        </Pressable>
      </View>

      <Modal animationType="slide" visible={isModalMenu}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.opciones}>
            <ScrollView>
              <View style={styles.top}>
                <Pressable
                  onPress={handleNoVisibleModal}
                  style={styles.btnClose}
                >
                  <Svg
                    style={styles.btnSvg}
                    width={30}
                    height={30}
                    fill="none"
                    stroke="#FFF"
                    viewBox="0 0 24 24"
                  >
                    <Path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </Svg>
                </Pressable>

                <Pressable
                  onPress={() => {
                    navigate('Perfil');
                    handleNoVisibleModal();
                  }}
                  style={styles.btnItem}
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </Svg>
                  <Text style={styles.btnText}>Mis Datos</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    navigate('UpdatePerfil');
                    handleNoVisibleModal();
                  }}
                  style={styles.btnItem}
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
                  <Text style={styles.btnText}>Actualizar Perfil</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    navigate('UpdatePassword');
                    handleNoVisibleModal();
                  }}
                  style={styles.btnItem}
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
                  <Text style={styles.btnText}>Cambiar Password</Text>
                </Pressable>
              </View>
            </ScrollView>

            <View style={styles.bottom}>
              <Pressable
                onPress={() => {
                  handleNoVisibleModal();
                  handleLogout();
                  navigate('Login');
                }}
                style={styles.btnItem}
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
                <Text style={styles.btnText}>Cerrar Sesión</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: colorContainer,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: colorBorder,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnIco: {
    padding: 20,
  },
  btnSvg: {
    marginRight: 16,
  },
  btnItem: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  btnText: {
    color: colorWhite,
    fontSize: 20,
    fontWeight: '500',
  },
  btnClose: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 50,
    height: 50,
    backgroundColor: colorPrimary,
    padding: 10,
    borderRadius: 50,
  },
  titulo: {
    color: colorWhite,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  tituloBold: {
    color: '#9DD0FF',
    fontWeight: '600',
  },
  modal: {
    flex: 1,
    backgroundColor: colorContainer,
  },
  opciones: {
    flex: 1,
  },
  top: {
    position: 'relative',
    padding: 20,
    flex: 1,
    paddingTop: 50,
  },
  bottom: {
    backgroundColor: colorContainer,
    borderTopWidth: 1,
    borderColor: colorBorder,
    paddingTop: 30,
    paddingHorizontal: 20,
    zIndex: 5,
  },
});

export default Header;
