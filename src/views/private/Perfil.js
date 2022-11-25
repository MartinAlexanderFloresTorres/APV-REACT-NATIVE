import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import usePacientes from '../../hooks/usePacientes';
import {
  colorBorder,
  colorContainer,
  colorInputText,
  colorWhite,
} from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';

const Perfil = () => {
  // usePacientes
  const { auth } = usePacientes();

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <View style={styles.contenedor}>
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <Text style={styles.input}>{auth.user.nombre}</Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.input}>{auth.user.email}</Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Telefono</Text>
            <Text style={styles.input}>
              {auth.user.telefono ?? 'Ningun telefono'}
            </Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Web</Text>
            <Text style={styles.input}>
              {auth.user.web ?? 'Ningun sitio web'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    padding: 30,
    backgroundColor: colorContainer,
  },
  campo: {
    marginBottom: 20,
  },
  label: {
    color: colorWhite,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: '500',
  },
  input: {
    color: colorInputText,
    borderBottomWidth: 1,
    borderBottomColor: colorBorder,
    paddingVertical: 10,
  },
});

export default Perfil;
