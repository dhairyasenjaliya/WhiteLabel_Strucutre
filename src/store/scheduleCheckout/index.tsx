/* eslint-disable no-fallthrough */
import {
  API_START,
  API_END,
  VIEW_SCHEDULE_CART,
  GET_ADDABLE_SERVICE,
  ADD_SCHEDULE_API,
  REMOVE_SCHEDULE_API,
  CHECKOUT_SCHEDULE_API,
  CANCEL_SCHEDULE_API,
} from '../actionType/type';

const initialData = {
  isLoadingData: false,
  viewScheduleCart: [],
  addableService: [],
  appointmentList: [],
  removeService: [],
  checkoutAppointment: [],
  cancelAppointment: [],
};

export default function scheduleCheckoutReducer(
  state = initialData,
  action: any,
) {
  switch (action.type) {
    case CANCEL_SCHEDULE_API:
      return {
        ...state,
        cancelAppointment: action.payload,
      };
    case CHECKOUT_SCHEDULE_API:
      return {
        ...state,
        checkoutAppointment: action.payload,
      };
    case REMOVE_SCHEDULE_API:
      return {
        ...state,
        removeService: action.payload,
      };
    case ADD_SCHEDULE_API:
      return {
        ...state,
        appointmentList: action.payload,
      };
    case VIEW_SCHEDULE_CART:
      return {
        ...state,
        viewScheduleCart: action.payload,
      };

    case GET_ADDABLE_SERVICE:
      return {
        ...state,
        addableService: action.payload,
      };

    case API_START:
      if (action.payload === CHECKOUT_SCHEDULE_API) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      if (action.payload === VIEW_SCHEDULE_CART) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      if (action.payload === GET_ADDABLE_SERVICE) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      if (action.payload === ADD_SCHEDULE_API) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      if (action.payload === REMOVE_SCHEDULE_API) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      if (action.payload === CANCEL_SCHEDULE_API) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

    case API_END:
      if (action.payload === CANCEL_SCHEDULE_API) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === CHECKOUT_SCHEDULE_API) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === REMOVE_SCHEDULE_API) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === VIEW_SCHEDULE_CART) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === GET_ADDABLE_SERVICE) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === ADD_SCHEDULE_API) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

    default:
      return state;
  }
}
