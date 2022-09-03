import axios from 'axios';
import {CONSTANTS} from '../../constants';
import {store} from '../store';

const login = (email, password) => {
  const body = {
    email: email,
    password: password,
  };

  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE_URL + CONSTANTS.API_URLS.LOGIN, body)
    .then(onSuccess)
    .catch(onFailure);
};

const signup = data => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE_URL + CONSTANTS.API_URLS.SIGN_UP, data)
    .then(onSuccess)
    .catch(onFailure);
};

const verifyOtp = (email, otp) => {
  const body = {
    email: email,
    otp: otp,
  };

  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      `${CONSTANTS.API_URLS.BASE_URL}${CONSTANTS.API_URLS.VERIFY_OTP}`,
      body,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const forgotPassword = async email => {
  const body = {
    email: email,
  };

  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      `${CONSTANTS.API_URLS.BASE_URL}${CONSTANTS.API_URLS.FORGOT_PASSWORD}`,
      body,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const resetPassword = data => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      `${CONSTANTS.API_URLS.BASE_URL}${CONSTANTS.API_URLS.RESET_PASSWORD}`,
      data,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const logout = async () => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE_URL + CONSTANTS.API_URLS.LOGOUT, {
      headers: {
        Authorization: store?.getState()?.auth?.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const deactivate = () => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  const data = {
    userID: store?.getState()?.profile?.profile?.id,
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.DEACTIVATE, data, {
      headers: {
        Authorization: store?.getState()?.auth?.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const authService = {
  login,
  signup,
  logout,
  deactivate,
  verifyOtp,
  forgotPassword,
  resetPassword,
};

export default authService;
