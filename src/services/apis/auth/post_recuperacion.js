import { Platform } from 'react-native';
import { URL_Android, URL_IOS } from '../../../config/server_url';

const post_recuperacion = async ({ email }) => {
  let url = '';
  if (Platform.OS === 'ios') {
    url = `${URL_IOS}/api/veterinarios/olvide-password`;
  } else {
    url = `${URL_Android}/api/veterinarios/olvide-password`;
  }

  return await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
    .then(response => response.json())
    .catch(error => {
      throw new Error(error);
    });
};

export default post_recuperacion;
