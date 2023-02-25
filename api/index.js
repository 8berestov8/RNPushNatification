import axios from 'axios';
import {APP_URL_API} from '../config';

export default {
  new(session) {
    return axios.create({
      headers: {
        session,
        crossDomain: true,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
        'Access-Control-Allow-Headers':
          'Content-Type, X-Auth-Token, Origin, Authorization',
        Accept: 'application/json',
      },
      baseURL: APP_URL_API,
    });
  },
  // checkError(response) {
  //   return new Promise((resolve, reject) => {
  //     if (
  //       typeof response == 'undefined' ||
  //       typeof response.status == 'undefined' ||
  //       (typeof response.status != 'undefined' && !response.status)
  //     ) {
  //       reject('Сервер не отвечает, проверьте ваше интернет соединение');
  //     } else {
  //       if (response && response.data && response.data.message) {
  //         reject(
  //           Object.values(response.data.errors)
  //             .map(v => v.join('\n'))
  //             .join('\n'),
  //         );
  //       } else {
  //         reject('Ошибка получения данных, попробуйте повторить запрос позже');
  //       }
  //     }
  //   });
  // },
};
