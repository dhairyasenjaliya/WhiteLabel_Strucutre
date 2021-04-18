/* eslint-disable no-fallthrough */
import {
  API_START,
  API_END,
  DEAL_FAVOURITE_ADD_REMOVE,
} from '../actionType/type';

const initialData = {
  favouriteDealResponse: [],
  isLoadingData: false,
};

export default function manageFavoriteReducer(
  state = initialData,
  action: any,
) {
  switch (action.type) {
    case DEAL_FAVOURITE_ADD_REMOVE:
      return {
        ...state,
        favouriteDealResponse: action.payload,
      };

    case API_START:
      if (action.payload === DEAL_FAVOURITE_ADD_REMOVE) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

    case API_END:
      if (action.payload === DEAL_FAVOURITE_ADD_REMOVE) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

    default:
      return state;
  }
}
