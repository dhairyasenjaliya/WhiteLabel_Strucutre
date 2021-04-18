import {FETCH_ALGOLIA_CONFIG} from '../actionType/type';
import {base_url} from '../../utils/api-configuration';
// import * as RootNavigation from '../../navigation/rootNavigation';
import apiAction from '../apiAction';
import {Alert} from 'react-native';

export function fetchAlgoliaConfig() {
  return apiAction({
    url: `${base_url}search/algolia/credential`,
    onSuccess: algoliaDataFetchedSuccess,
    onFailure: algoliaDataFetchError,
    label: FETCH_ALGOLIA_CONFIG,
    // data,
    // param: data,
  });
}

function algoliaDataFetchedSuccess(data: any) {
  // console.log('algoliaData FetchedSuccess Reducer data==>>>', data.res);
  return {
    type: FETCH_ALGOLIA_CONFIG,
    payload: data.res,
  };
}

function algoliaDataFetchError(Err: any) {
  // Alert.alert(
  //   'Unable to fetch algolia config Please Try Again ',
  //   JSON.stringify(Err.message),
  // );
  console.log('algoliaData FetchError Reducer data==>>>', Err);
  return {
    type: FETCH_ALGOLIA_CONFIG,
    payload: Err,
  };
}
