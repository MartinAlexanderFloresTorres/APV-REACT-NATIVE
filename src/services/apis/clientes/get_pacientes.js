import { Platform } from 'react-native';
import { URL_Android, URL_IOS } from '../../../config/server_url';
import getConfig from '../../../config/getConfig';

const get_pacientes = async ({ token }) => {
  let url = '';
  if (Platform.OS === 'ios') {
    url = `${URL_IOS}/api/pacientes`;
  } else {
    url = `${URL_Android}/api/pacientes`;
  }

  return await fetch(url, {
    method: 'GET',
    headers: getConfig({ token }),
  })
    .then(response => response.json())
    .catch(error => {
      throw new Error(error);
    });
};

export default get_pacientes;
