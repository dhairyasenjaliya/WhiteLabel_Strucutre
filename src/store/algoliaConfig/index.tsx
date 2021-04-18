/* eslint-disable no-fallthrough */
import {API_START, API_END, FETCH_ALGOLIA_CONFIG} from '../actionType/type';

const initialData = {
  algoliaConfig: null,
  isLoadingData: false,
};

export default function algoliaReducer(state = initialData, action: any) {
  switch (action.type) {
    case FETCH_ALGOLIA_CONFIG:
      return {
        ...state,
        algoliaConfig: action.payload,
      };

    case API_START:
      if (action.payload === FETCH_ALGOLIA_CONFIG) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

    case API_END:
      if (action.payload === FETCH_ALGOLIA_CONFIG) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

    default:
      return state;
  }
}
