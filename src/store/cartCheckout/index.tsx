/* eslint-disable no-fallthrough */
import {
  API_START,
  API_END,
  VIEW_CART,
  CHECKOUT_API,
  REMOVE_SERVICE_API,
  FETCH_AVAILABLE_PAYMENT_OPTION,
  RAZOR_PAY_INIT,
  RAZOR_PAY_VERIFY,
} from '../actionType/type';

const initialData = {
  isLoadingData: false,
  viewCart: [],
  checkOutApi: [],
  removeService: [],
  availablePaymentOption: [],
  razorPayInit: [],
  razorPayVerifyData: [],
};

export default function cartCheckoutReducer(state = initialData, action: any) {
  switch (action.type) {
    case VIEW_CART:
      return {
        ...state,
        viewCart: action.payload,
      };

    case RAZOR_PAY_VERIFY:
      return {
        ...state,
        razorPayVerifyData: action.payload,
      };

    case RAZOR_PAY_INIT:
      return {
        ...state,
        razorPayInit: action.payload,
      };

    case FETCH_AVAILABLE_PAYMENT_OPTION:
      return {
        ...state,
        availablePaymentOption: action.payload,
      };

    case CHECKOUT_API:
      return {
        ...state,
        checkOutApi: action.payload,
      };

    case REMOVE_SERVICE_API:
      return {
        ...state,
        removeService: action.payload,
      };

    case API_START:
      if (action.payload === RAZOR_PAY_INIT) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      if (action.payload === RAZOR_PAY_VERIFY) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === VIEW_CART) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      if (action.payload === FETCH_AVAILABLE_PAYMENT_OPTION) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === CHECKOUT_API) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      if (action.payload === REMOVE_SERVICE_API) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

    case API_END:
      if (action.payload === RAZOR_PAY_INIT) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === RAZOR_PAY_VERIFY) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === VIEW_CART) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === FETCH_AVAILABLE_PAYMENT_OPTION) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === CHECKOUT_API) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === REMOVE_SERVICE_API) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

    default:
      return state;
  }
}
