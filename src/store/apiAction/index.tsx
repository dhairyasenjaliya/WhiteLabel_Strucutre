import {API} from '../actionType/type';

export default function apiAction({
  url = '',
  method = 'POST',
  data = null,
  accessToken = null,
  onSuccess = {},
  onFailure = {},
  label = '',
  headersOverride = null,
  param = {},
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      accessToken,
      onSuccess,
      onFailure,
      label,
      headersOverride,
      param,
    },
  };
}
