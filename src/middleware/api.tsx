import axios from 'axios';
import {API} from '../store/responseHandle/type';
import {apiError, apiStart, apiEnd} from '../store/responseHandle/api';

const apiMiddleware = ({dispatch}: any) => (next: any) => (action: any) => {
  next(action);

  if (action.type !== API) {
    return;
  }

  const {
    url,
    method,
    data,
    accessToken,
    onSuccess,
    onFailure,
    label,
    headers,
    param,
  } = action.payload;
  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  // axios.defaults.headers.common.Authorization = `Bearer ${globalAuthToken}`;
  if (label) {
    dispatch(apiStart(label));
  }

  axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: data,
    })
    .then(({data}) => {
      dispatch(onSuccess({res: data, param: param}));
    })
    .catch((error) => {
      // console.log('url',url);
      console.log('APIerror==>>', error.response);
      dispatch(apiError(error));
      dispatch(onFailure(error));
      if (error.response && error.response.status === 403) {
        dispatch(onFailure(error));
      }
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label));
      }
    });
};

export default apiMiddleware;
