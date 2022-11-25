import { Platform } from 'react-native';
import { URL_Android, URL_IOS } from '../../../config/server_url';
import getConfig from '../../../config/getConfig';

const post_pacientes = async ({
  paciente: { nombre, propietario, fechaAlta, email, sintomas },
  token,
}) => {
  let url = '';
  if (Platform.OS === 'ios') {
    url = `${URL_IOS}/api/pacientes`;
  } else {
    url = `${URL_Android}/api/pacientes`;
  }

  return await fetch(url, {
    method: 'POST',
    headers: getConfig({ token }),
    body: JSON.stringify({ nombre, propietario, fechaAlta, email, sintomas }),
  })
    .then(response => response.json())
    .catch(error => {
      throw new Error(error);
    });
};

export default post_pacientes;
