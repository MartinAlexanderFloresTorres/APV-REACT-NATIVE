import { Platform } from 'react-native';
import { URL_Android, URL_IOS } from '../../../config/server_url';
import getConfig from '../../../config/getConfig';

const put_pacientes = async ({
  paciente: { nombre, propietario, email, fechaAlta, sintomas, _id },
  token,
}) => {
  let url = '';
  if (Platform.OS === 'ios') {
    url = `${URL_IOS}/api/pacientes/${_id}`;
  } else {
    url = `${URL_Android}/api/pacientes/${_id}`;
  }

  return await fetch(url, {
    method: 'PUT',
    headers: getConfig({ token }),
    body: JSON.stringify({ nombre, propietario, email, fechaAlta, sintomas }),
  })
    .then(response => response.json())
    .catch(error => {
      throw new Error(error);
    });
};

export default put_pacientes;
