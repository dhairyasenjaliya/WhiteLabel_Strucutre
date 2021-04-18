import {FETCH_SALON_DETAILS, LIST_ALL_SALON} from '../actionType/type';
import {base_url, SalonId} from '../../utils/api-configuration';
// import * as RootNavigation from '../../navigation/rootNavigation';
import apiAction from '../apiAction';
import {Alert} from 'react-native';

export function fetchSalonDetails(Data: String) {
  // let Data = '839bec35-8989-459d-9733-b463c8cc4dba';
  let check = Data === '' ? SalonId : Data;
  return apiAction({
    url: `${base_url}salon/${check}`,
    onSuccess: salonDetailFetchedSuccess,
    onFailure: salonDetailFetchError,
    label: FETCH_SALON_DETAILS,
    method: 'GET',
    // data,
    // param: data,
  });
}

function salonDetailFetchedSuccess(data: any) {
  console.log('salonDetail FetchedSuccess Reducer data==>>>');
  return {
    type: FETCH_SALON_DETAILS,
    payload: data.res,
  };
}

function salonDetailFetchError(Err: any) {
  Alert.alert(
    'Unable to fetch Salon Detail Please Try Again ',
    JSON.stringify(Err.message),
  );
  // console.log('salonDetail FetchError Reducer data==>>>', Err);
  return {
    type: FETCH_SALON_DETAILS,
    payload: Err,
  };
}

export function listAllSalon(Data: any) {
  return {
    type: LIST_ALL_SALON,
    payload: Data,
  };
}
