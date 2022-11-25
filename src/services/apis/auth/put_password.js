import { Platform } from 'react-native';
import { URL_Android, URL_IOS } from '../../../config/server_url';
import getConfig from '../../../config/getConfig';

const put_password = async ({ password, passwordNuevo, token }) => {
  let url = '';
  if (Platform.OS === 'ios') {
    url = `${URL_IOS}/api/veterinarios/actualizar-password`;
  } else {
    url = `${URL_Android}/api/veterinarios/actualizar-password`;
  }

  return await fetch(url, {
    method: 'PUT',
    headers: getConfig({ token }),
    body: JSON.stringify({ password, passwordNuevo }),
  })
    .then(response => response.json())
    .catch(error => {
      throw new Error(error);
    });
};

export default put_password;
