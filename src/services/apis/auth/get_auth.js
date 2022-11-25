import { Platform } from 'react-native';
import { URL_Android, URL_IOS } from '../../../config/server_url';

const get_auth = async ({ token }) => {
  let url = '';
  if (Platform.OS === 'ios') {
    url = `${URL_IOS}/api/veterinarios/perfil`;
  } else {
    url = `${URL_Android}/api/veterinarios/perfil`;
  }

  return await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .catch(error => {
      throw new Error(error);
    });
};

export default get_auth;
