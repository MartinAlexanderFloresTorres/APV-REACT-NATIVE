import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { formatearFecha } from '../helpers/formatearFecha';
import usePacientes from '../hooks/usePacientes';
import {
  colorBorder,
  colorContainer,
  colorPrimary,
  colorPurple,
  colorWhite,
} from '../styles/colors';

const Paciente = ({ item }) => {
  const { nombre, fechaAlta, _id } = item;
  // usePacientes
  const { showUpdateModal, deletePaciente, handleVisibleModalInfo } =
    usePacientes();

  return (
    <Pressable
      style={styles.card}
      onPress={() => handleVisibleModalInfo({ paciente: item })}
    >
      <View>
        <Text style={styles.titulo}>Paciente:</Text>
        <Text style={styles.paciente}>{nombre}</Text>
        <Text style={styles.fecha}>{formatearFecha(fechaAlta)}</Text>
      </View>

      <View style={styles.botones}>
        <Pressable
          style={[styles.btn, styles.updateBtn]}
          onPress={() => showUpdateModal({ paciente: item })}
        >
          <Text style={styles.btnText}>Editar</Text>
        </Pressable>
        <Pressable
          style={[styles.btn, styles.deleteBtn]}
          onPress={() => deletePaciente({ _id })}
        >
          <Text style={styles.btnText}>Eliminar</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colorContainer,
    flexWrap: 'wrap',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: colorBorder,
  },
  titulo: {
    color: colorWhite,
    fontWeight: '900',
    marginBottom: 5,
    fontSize: 20,
    textTransform: 'uppercase',
  },
  paciente: {
    color: colorPurple,
    fontWeight: '900',
    marginBottom: 10,
    fontSize: 30,
  },
  fecha: {
    color: colorWhite,
    fontWeight: '400',
  },
  botones: {
    marginTop: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  btn: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 10,
  },
  btnText: {
    color: colorWhite,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  updateBtn: {
    backgroundColor: colorPurple,
    marginBottom: 10,
  },
  deleteBtn: {
    backgroundColor: colorPrimary,
  },
});
export default Paciente;
