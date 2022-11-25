import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import delete_pacientes from '../services/apis/clientes/delete_pacientes';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pacientes Context
const PacientesContext = createContext(null);

// Pacientes Provider
const PacientesProvider = ({ children }) => {
  // Estados
  const [pacientes, setPacientes] = useState([]);
  const [isModalPaciente, setIsModalPaciente] = useState(false);
  const [isModalInfo, setIsModalInfo] = useState(false);
  const [pacienteEditar, setPacienteEditar] = useState({});
  const [pacienteInfo, setPacientInfo] = useState({});
  const [auth, setAuth] = useState(null);

  // Cerrar sesión
  const handleLogout = async () => {
    setAuth(null);
    await AsyncStorage.clear();
  };

  // Visible Modal Formulario
  const handleVisibleModal = () => {
    setIsModalPaciente(true);
  };

  // No Visible Modal Formulario
  const handleNoVisibleModal = () => {
    setIsModalPaciente(false);
    setPacienteEditar({});
  };

  // Visible Modal Informacion
  const handleVisibleModalInfo = ({ paciente }) => {
    setIsModalInfo(true);
    setPacientInfo(paciente);
  };

  // Visible Modal Informacion
  const handleNoVisibleModalInfo = () => {
    setIsModalInfo(false);
    setPacientInfo({});
  };

  // Add Paciente
  const AddPaciente = ({ paciente }) => {
    setPacientes([...pacientes, paciente]);
  };

  // eliminar paciente
  const removePaciente = async ({ _id }) => {
    try {
      const data = await delete_pacientes({ _id, token: auth.token });

      // Mostar mensaje
      Alert.alert('Paciente', data.msg);

      if (!data.msg.includes('denegados')) {
        // Sincrónizar pacientes
        setPacientes(pacientes.filter(paciente => paciente._id !== _id));
        handleNoVisibleModal();
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Error al eliminar paciente');
    }
  };

  // Delete Paciente
  const deletePaciente = ({ _id }) => {
    Alert.alert(
      '¿Deseas Eliminar?',
      'Un paciente eliminado no se puede recuperar',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Si, Eliminar',
          onPress: () => {
            removePaciente({ _id });
          },
          style: 'destructive',
        },
      ],
    );
  };

  // Show update modal
  const showUpdateModal = ({ paciente }) => {
    handleVisibleModal();
    setPacienteEditar(paciente);
  };

  // Update Paciente
  const updatePaciente = ({ paciente }) => {
    const pacientesActualizados = pacientes.map(p =>
      p._id === paciente._id ? paciente : p,
    );
    setPacientes(pacientesActualizados);
  };

  return (
    <PacientesContext.Provider
      value={{
        auth,
        setAuth,
        handleLogout,
        pacientes,
        AddPaciente,
        deletePaciente,
        updatePaciente,
        pacienteEditar,
        showUpdateModal,
        isModalPaciente,
        handleVisibleModal,
        handleNoVisibleModal,
        isModalInfo,
        handleVisibleModalInfo,
        handleNoVisibleModalInfo,
        pacienteInfo,
        setPacientes,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export { PacientesContext };
export default PacientesProvider;
