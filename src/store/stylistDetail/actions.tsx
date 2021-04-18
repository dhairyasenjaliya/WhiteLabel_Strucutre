import {FETCH_STYLIST_DETAILS, LIST_ALL_STYLIST} from '../actionType/type';
import {base_url} from '../../utils/api-configuration';
// import * as RootNavigation from '../../navigation/rootNavigation';
import apiAction from '../apiAction';
import {Alert} from 'react-native';

// {{hostApiPath}}/salon/839bec35-8989-459d-9733-b463c8cc4dba/personnel/
// 5c3aa8bb-c7ae-4793-9a66-4b5cc5a85026
export function fetchStylistDetails(salonId: String, stylistId: String) {
  // let Data = '839bec35-8989-459d-9733-b463c8cc4dba';
  return apiAction({
    url: `${base_url}salon/${salonId}/personnel/${stylistId}`,
    onSuccess: stylistDetailFetchedSuccess,
    onFailure: stylistDetailFetchError,
    label: FETCH_STYLIST_DETAILS,
    method: 'GET',
    // data,
    // param: data,
  });
}

function stylistDetailFetchedSuccess(data: any) {
  console.log('StylistDetail FetchedSuccess Reducer data==>>>');
  return {
    type: FETCH_STYLIST_DETAILS,
    payload: data.res,
  };
}

function stylistDetailFetchError(Err: any) {
  Alert.alert(
    'Unable to fetch stylist Detail Please Try Again ',
    JSON.stringify(Err.message),
  );
  // console.log('salonDetail FetchError Reducer data==>>>', Err);
  return {
    type: FETCH_STYLIST_DETAILS,
    payload: Err,
  };
}

export function listAllStylist(Data: any) {
  return {
    type: LIST_ALL_STYLIST,
    payload: Data,
  };
}
