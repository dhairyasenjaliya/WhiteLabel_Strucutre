/* eslint-disable no-fallthrough */
import {
  API_START,
  API_END,
  FETCH_STYLIST_DETAILS,
  LIST_ALL_STYLIST,
} from '../actionType/type';

const initialData = {
  stylistDetail: [],
  isLoadingData: false,
  stylistList: [],
};

export default function stylistDetailReducer(state = initialData, action: any) {
  switch (action.type) {
    case FETCH_STYLIST_DETAILS:
      return {
        ...state,
        stylistDetail: action.payload,
      };
    case LIST_ALL_STYLIST:
      return {
        ...state,
        stylistList: action.payload,
      };

    case API_START:
      if (action.payload === FETCH_STYLIST_DETAILS) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

    case API_END:
      if (action.payload === FETCH_STYLIST_DETAILS) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

    default:
      return state;
  }
}
