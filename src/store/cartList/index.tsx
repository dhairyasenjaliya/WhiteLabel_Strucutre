/* eslint-disable no-fallthrough */
import {
  API_START,
  API_END,
  ADD_SERVICE_LIST,
  AVAILABLE_STYLIST,
  AVAILABLE_TIME_SLOT,
  SELECTED_STYLIST,
  SELECTED_DATE,
  SELECTED_TIME,
  ADD_SERVICE_API,
  ADD_SERVICE_UUID_MASTER,
  CHECK_SERVICE_TYPE,
  ADD_SCHEDULE_API,
  AVAILABLE_DATE_SLOT,
} from '../actionType/type';

const initialData = {
  isLoadingData: false,
  isLoadingAvailableList: false,
  data: [],
  availableStylist: [],
  availableTimeSlot: [],
  selectedStylist: false,
  selectedTime: '',
  selectedDate: '',
  serviceAPI: false,
  serviceUuidMaster: {
    variation_uuid: null,
    service_uuid: null,
  },
  checkServiceType: [],
  availableDateSlot: [],
};

export default function cartListReducer(state = initialData, action: any) {
  switch (action.type) {
    case AVAILABLE_DATE_SLOT:
      return {
        ...state,
        availableDateSlot: action.payload,
        // data: [...state.data, action.payload],
      };
    case ADD_SERVICE_LIST:
      return {
        ...state,
        data: action.payload,
        // data: [...state.data, action.payload],
      };
    case CHECK_SERVICE_TYPE:
      return {
        ...state,
        checkServiceType: action.payload,
      };

    case AVAILABLE_STYLIST:
      return {
        ...state,
        availableStylist: action.payload,
      };

    case AVAILABLE_TIME_SLOT:
      return {
        ...state,
        availableTimeSlot: action.payload,
      };

    case SELECTED_STYLIST:
      return {
        ...state,
        selectedStylist: action.payload,
      };

    case SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload,
      };

    case SELECTED_TIME:
      return {
        ...state,
        selectedTime: action.payload,
      };

    case ADD_SERVICE_UUID_MASTER:
      return {
        ...state,
        serviceUuidMaster: action.payload,
      };

    case ADD_SERVICE_API:
      return {
        ...state,
        serviceAPI: action.payload,
      };

    case API_START:
      if (action.payload === AVAILABLE_DATE_SLOT) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      if (action.payload === ADD_SERVICE_LIST) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      if (action.payload === AVAILABLE_STYLIST) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      if (action.payload === AVAILABLE_TIME_SLOT) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      if (action.payload === ADD_SERVICE_API) {
        return {
          ...state,
          isLoadingAvailableList: true,
        };
      }

    case API_END:
      if (action.payload === AVAILABLE_DATE_SLOT) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === ADD_SERVICE_LIST) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === AVAILABLE_STYLIST) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === AVAILABLE_TIME_SLOT) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === ADD_SERVICE_API) {
        return {
          ...state,
          isLoadingAvailableList: false,
        };
      }

    default:
      return state;
  }
}
