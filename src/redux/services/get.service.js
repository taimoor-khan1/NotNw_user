import axios from 'axios';
import {CONSTANTS} from '../../constants';
import {store} from '../store';

const getData = async (api, params) => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  const config = {
    headers: {
      Authorization: store?.getState()?.auth?.accessToken,
    },
    params: params || {},
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE_URL + api, config)
    .then(onSuccess)
    .catch(onFailure);
};

const getService = {
  getData,
};

export default getService;
