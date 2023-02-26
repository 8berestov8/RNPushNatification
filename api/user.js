import API from './index';

export const createUser = (username, password, fcmtoken) => {
  return new Promise((resolve, reject) => {
    API.new()
      .post('/user/create', {
        username: username,
        password: password,
        fcmtoken: fcmtoken,
      })
      .then(res => {
        console.log(res.data);
        reject(res.data);
      });
  }).catch(err => {
    // eslint-disable-next-line no-shadow
    API.checkError(err.response).catch(err => err);
  });
};
