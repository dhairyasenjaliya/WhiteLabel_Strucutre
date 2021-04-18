import {DEAL_FAVOURITE_ADD_REMOVE} from '../actionType/type';
import {base_url} from '../../utils/api-configuration';
// import * as RootNavigation from '../../navigation/rootNavigation';
import apiAction from '../apiAction';
// import {Alert} from 'react-native';

export function dealFavourite(
  consumerId: String,
  addOrRemove: String,
  data: Object,
) {
  return apiAction({
    url: `${base_url}/consumers/${consumerId}/deals/favourite/${addOrRemove}`,
    onSuccess: dealFavouriteSuccess,
    onFailure: dealFavouriteError,
    label: DEAL_FAVOURITE_ADD_REMOVE,
    data,
    // param: data,
  });
}

function dealFavouriteSuccess(data: any) {
  console.log('dealFavouriteSuccess');
  return {
    type: DEAL_FAVOURITE_ADD_REMOVE,
    payload: data.res,
  };
}

function dealFavouriteError(Err: any) {
  // Alert.alert(
  //   'Unable to fetch algolia config Please Try Again ',
  //   JSON.stringify(Err.message),
  // );
  console.log('dealFavouriteError==>>>', Err);
  return {
    type: DEAL_FAVOURITE_ADD_REMOVE,
    payload: Err,
  };
}
