import API from './index';

export const createUser = (username, password, fcmtoken, platform) => {
  return new Promise((resolve, reject) => {
    API.new()
      .post('/create', {
        username: username,
        password: password,
        fcmtoken: fcmtoken,
        platform: platform,
      })
      .then(res => {
        // console.log(res.data);
        resolve(res.data);
      });
  }).catch(err => {
    // eslint-disable-next-line no-shadow
    API.checkError(err.response).catch(err => err);
  });
};

export const authUser = (username, password) => {
  return new Promise((resolve, reject) => {
    API.new()
      .post('/auth', {
        username: username,
        password: password,
      })
      .then(res => {
        // console.log(res.data);
        resolve(res.data);
      });
  }).catch(err => {
    // eslint-disable-next-line no-shadow
    API.checkError(err.response).catch(err => err);
  });
};
