import { Platform } from 'react-native';
import { URL_Android, URL_IOS } from '../../../config/server_url';
import getConfig from '../../../config/getConfig';

const put_perfil = async ({ id, nombre, email, web, telefono, token }) => {
  let url = '';
  if (Platform.OS === 'ios') {
    url = `${URL_IOS}/api/veterinarios/perfil/${id}`;
  } else {
    url = `${URL_Android}/api/veterinarios/perfil/${id}`;
  }

  return await fetch(url, {
    method: 'PUT',
    headers: getConfig({ token }),
    body: JSON.stringify({ nombre, email, web, telefono }),
  })
    .then(response => response.json())
    .catch(error => {
      throw new Error(error);
    });
};

export default put_perfil;
