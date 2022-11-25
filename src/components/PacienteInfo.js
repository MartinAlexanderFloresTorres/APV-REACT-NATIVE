import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Svg, Path } from 'react-native-svg';
import usePacientes from '../hooks/usePacientes';
import {
  colorBorder,
  colorContainer,
  colorPrimary,
  colorWhite,
} from '../styles/colors';
import { formatearFecha } from '../helpers/formatearFecha';
import globalStyles from '../styles/globalStyles';

const PacienteInfo = () => {
  // usePacientes
  const { pacienteInfo, handleNoVisibleModalInfo } = usePacientes();
  const { nombre, email, fechaAlta, propietario, sintomas } = pacienteInfo;

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <View style={styles.contenedor}>
          <View style={styles.header}>
            <Text style={styles.titulo}>
              Información <Text style={styles.tituloBold}>Paciente</Text>
            </Text>

            <Pressable
              onPress={handleNoVisibleModalInfo}
              style={styles.closeBtn}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </Svg>
            </Pressable>
          </View>

          <View style={styles.card}>
            <View style={styles.item}>
              <Text style={styles.subTitle}>Nombre:</Text>
              <Text style={styles.text}>{nombre}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.subTitle}>Propietario:</Text>
              <Text style={styles.text}>{propietario}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.subTitle}>Email:</Text>
              <Text style={styles.text}>{email}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.subTitle}>Fecha Alta:</Text>
              <Text style={styles.text}>{formatearFecha(fechaAlta)}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.subTitle}>Sintomas:</Text>
              <Text style={styles.text}>{sintomas}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    padding: 20,
    borderRadius: 10,
  },
  closeBtn: {
    backgroundColor: colorPrimary,
    padding: 10,
    borderRadius: 50,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  titulo: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '600',
    textTransform: 'uppercase',
    flex: 1,
  },
  tituloBold: {
    fontWeight: '900',
    color: '#9DD0FF',
  },
  card: {
    backgroundColor: colorContainer,
    padding: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colorBorder,
  },
  item: {
    marginBottom: 20,
  },
  subTitle: {
    color: colorWhite,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  text: {
    color: colorWhite,
    fontWeight: '400',
  },
});

export default PacienteInfo;
