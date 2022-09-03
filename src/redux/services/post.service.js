import axios from 'axios';
import {CONSTANTS} from '../../constants';
import {store} from '../store';

const postData = (api, data) => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE_URL + api, data || {}, {
      headers: {
        Authorization: store?.getState()?.auth?.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const postService = {
  postData,
};

export default postService;
