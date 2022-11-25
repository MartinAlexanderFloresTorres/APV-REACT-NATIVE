import { useContext } from 'react';
import { PacientesContext } from '../providers/PacientesProvider';

const usePacientes = () => {
  return useContext(PacientesContext);
};

export default usePacientes;
