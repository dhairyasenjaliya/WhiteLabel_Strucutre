/* eslint-disable no-fallthrough */
import {
  API_START,
  API_END,
  FETCH_SALON_DETAILS,
  LIST_ALL_SALON,
} from '../actionType/type';

const initialData = {
  salonDetail: [],
  salonList: [],
  isLoadingData: false,
};

export default function salonDetailReducer(state = initialData, action: any) {
  switch (action.type) {
    case FETCH_SALON_DETAILS:
      return {
        ...state,
        salonDetail: action.payload,
      };
    case LIST_ALL_SALON:
      return {
        ...state,
        salonList: action.payload,
      };

    case API_START:
      if (action.payload === FETCH_SALON_DETAILS) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

    case API_END:
      if (action.payload === FETCH_SALON_DETAILS) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

    default:
      return state;
  }
}
