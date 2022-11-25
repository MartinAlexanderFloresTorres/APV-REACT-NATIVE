import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import { emailRegex } from '../constants';
import { formatearFecha } from '../helpers/formatearFecha';
import usePacientes from '../hooks/usePacientes';
import post_pacientes from '../services/apis/clientes/post_clientes';
import put_pacientes from '../services/apis/clientes/put_paciente';
import {
  colorBorder,
  colorContainer,
  colorInputPlaceholder,
  colorWhite,
} from '../styles/colors';
import globalStyles from '../styles/globalStyles';

const Formulario = ({ handleNoVisibleModal }) => {
  // Estados
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fechaAlta, setFechaAlta] = useState(new Date());
  const [sintomas, setSintomas] = useState('');
  const [cargando, setCargando] = useState(false);
  const [showDate, setShowDate] = useState(false);

  // usePacientes
  const { auth, pacienteEditar, AddPaciente, deletePaciente, updatePaciente } =
    usePacientes();

  // Efecto de escucha de paciente a editar
  useEffect(() => {
    if (pacienteEditar?._id) {
      setPaciente(pacienteEditar.nombre);
      setPropietario(pacienteEditar.propietario);
      setEmail(pacienteEditar.email);
      setFechaAlta(new Date(pacienteEditar.fechaAlta));
      setSintomas(pacienteEditar.sintomas);
    }
  }, [pacienteEditar]);

  const onChangeFecha = (_, selectedDate) => {
    const currentDate = selectedDate || fechaAlta;
    setShowDate(false);
    setFechaAlta(currentDate);
  };

  // Handle Submit
  const handlePressCita = async () => {
    // Validar
    if ([paciente, propietario, email, fechaAlta, sintomas].includes('')) {
      Alert.alert('Validación', 'Todo los campos son requeridos');
      return;
    }

    if (paciente.length < 4) {
      Alert.alert(
        'Validación',
        'El nombre del paciente debe ser mayor a 4 caracteres',
      );
      return;
    }

    if (paciente.length > 30) {
      Alert.alert(
        'Validación',
        'El nombre del paciente debe ser menor a 30 caracteres',
      );
      return;
    }

    if (propietario.length < 4) {
      Alert.alert(
        'Validación',
        'El nombre del propietario debe ser mayor a 4 caracteres',
      );
      return;
    }

    if (propietario.length > 30) {
      Alert.alert(
        'Validación',
        'El nombre del propietario debe ser menor a 30 caracteres',
      );
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Validación', 'El email no es válido');
      return;
    }

    if (sintomas.length < 3) {
      Alert.alert('Validación', 'Los síntomas deben ser mayor a 3 caracteres');
      return;
    }

    setCargando(true);
    try {
      // Modo Edicion?
      if (pacienteEditar?._id) {
        // Actualizar paciente
        const data = await put_pacientes({
          paciente: {
            _id: pacienteEditar._id,
            nombre: paciente,
            propietario,
            fechaAlta,
            email,
            sintomas,
          },
          token: auth.token,
        });
        updatePaciente({ paciente: data });
        Alert.alert('Exito', 'Paciente Actualizado correctamente');
      } else {
        // Agregar paciente
        const data = await post_pacientes({
          paciente: {
            nombre: paciente,
            propietario,
            fechaAlta,
            email,
            sintomas,
          },
          token: auth.token,
        });
        AddPaciente({ paciente: data });
        Alert.alert('Exito', 'Paciente agregado correctamente');
      }
      // Resetear el estado
      setPaciente('');
      setPropietario('');
      setEmail('');
      setFechaAlta('');
      setSintomas('');
      // Cerrar el modal
      handleNoVisibleModal();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Ocurrio un error al agregar el paciente');
    }
    setCargando(false);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Pressable onPress={handleNoVisibleModal} style={styles.btnClose}>
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
                d="M15 19l-7-7 7-7"
              />
            </Svg>
          </Pressable>

          <Text style={styles.titulo}>
            {pacienteEditar?._id ? 'Actualizar Paciente' : 'Agregar Paciente'}
          </Text>
        </View>

        <View style={styles.contenedor}>
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese nombre del paciente"
              placeholderTextColor={colorInputPlaceholder}
              value={paciente}
              onChangeText={text => setPaciente(text.trimStart())}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese nombre del propietario"
              placeholderTextColor={colorInputPlaceholder}
              value={propietario}
              onChangeText={text => setPropietario(text.trimStart())}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese su email"
              placeholderTextColor={colorInputPlaceholder}
              keyboardType="email-address"
              value={email}
              onChangeText={text => setEmail(text.trim())}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha de Alta</Text>
            <Text style={styles.input} onPress={() => setShowDate(true)}>
              {formatearFecha(fechaAlta)}
            </Text>
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Sintomas</Text>
            <TextInput
              style={styles.input}
              placeholder="Describe sus sintomas del paciente"
              placeholderTextColor={colorInputPlaceholder}
              multiline={true}
              value={sintomas}
              numberOfLines={4}
              onChangeText={text => setSintomas(text.trimStart())}
            />
          </View>

          <Pressable style={globalStyles.btn} onPress={handlePressCita}>
            <Text style={globalStyles.btnText}>
              {pacienteEditar?._id
                ? cargando
                  ? 'Guardando...'
                  : 'Guardar Cambios'
                : cargando
                ? 'Agregando...'
                : 'Agregar Paciente'}
            </Text>
          </Pressable>

          {pacienteEditar?._id && (
            <Pressable
              style={globalStyles.flex}
              onPress={() => deletePaciente({ _id: pacienteEditar?._id })}
            >
              <Text style={globalStyles.btnBold}>Eliminar Paciente</Text>
            </Pressable>
          )}
        </View>

        {showDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={fechaAlta}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeFecha}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colorContainer,
    borderBottomWidth: 1,
    borderBottomColor: colorBorder,
  },
  titulo: {
    flex: 1,
    color: colorWhite,
    fontSize: 16,
    fontWeight: '900',
    textTransform: 'uppercase',
    textAlign: 'center',
    padding: 20,
  },
  btnClose: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  contenedor: {
    padding: 30,
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
    color: colorWhite,
    borderBottomWidth: 1,
    borderBottomColor: colorBorder,
    paddingVertical: 10,
  },
});

export default Formulario;
