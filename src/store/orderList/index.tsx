/* eslint-disable no-fallthrough */
import {
  API_START,
  API_END,
  FETCH_ORDER_DETAIL,
  FETCH_PAST_ORDERS,
  FETCH_UPCOMING_ORDERS,
  ORDER_FETCH_ERROR,
  FETCH_PAST_NEXT_ORDERS,
  FETCH_UPCOMING_NEXT_ORDERS,
  REQUEST_CANCLE_ORDER,
  FETCH_APPOINTMENT_DETAIL,
  FETCH_MY_ORDER_HISTORY,
  FETCH_MY_ORDER_HISTORY_NEXT,
  FETCH_ORDER_HISTORY_DETAIL,
} from '../actionType/type';

const initialData = {
  isLoadingData: false,
  upcomingOrders: [],
  pastOrders: [],
  upcomingOrdersNext: [],
  pastOrdersNext: [],
  orderListingError: [],
  orderDetail: [],
  cancleOrder: [],
  appointmentDetail: [],
  myOrderHistory: [],
  myOrderHistoryNext: [],
  orderHistoryDetail: [],
};

export default function orderListReducer(state = initialData, action: any) {
  switch (action.type) {
    case FETCH_PAST_ORDERS:
      return {
        ...state,
        pastOrders: action.payload,
      };
    case FETCH_ORDER_HISTORY_DETAIL:
      return {
        ...state,
        orderHistoryDetail: action.payload,
      };

    case FETCH_MY_ORDER_HISTORY:
      return {
        ...state,
        myOrderHistory: action.payload,
      };

    case FETCH_MY_ORDER_HISTORY_NEXT:
      return {
        ...state,
        myOrderHistoryNext: action.payload,
      };

    case FETCH_UPCOMING_ORDERS:
      return {
        ...state,
        upcomingOrders: action.payload,
      };
    case ORDER_FETCH_ERROR:
      return {
        ...state,
        orderListingError: action.payload,
      };

    case FETCH_ORDER_DETAIL:
      return {
        ...state,
        orderDetail: action.payload,
      };

    case FETCH_PAST_NEXT_ORDERS:
      return {
        ...state,
        pastOrdersNext: action.payload,
      };

    case FETCH_UPCOMING_NEXT_ORDERS:
      return {
        ...state,
        upcomingOrdersNext: action.payload,
      };

    case REQUEST_CANCLE_ORDER:
      return {
        ...state,
        cancleOrder: action.payload,
      };

    case FETCH_APPOINTMENT_DETAIL:
      return {
        ...state,
        appointmentDetail: action.payload,
      };

    case API_START:
      if (action.payload === FETCH_ORDER_HISTORY_DETAIL) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === FETCH_PAST_ORDERS) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      if (action.payload === FETCH_UPCOMING_ORDERS) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      if (action.payload === FETCH_ORDER_DETAIL) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === FETCH_PAST_NEXT_ORDERS) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      if (action.payload === FETCH_UPCOMING_NEXT_ORDERS) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === REQUEST_CANCLE_ORDER) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === FETCH_APPOINTMENT_DETAIL) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === FETCH_MY_ORDER_HISTORY) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

    case API_END:
      if (action.payload === FETCH_MY_ORDER_HISTORY) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === FETCH_PAST_ORDERS) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === FETCH_UPCOMING_ORDERS) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === FETCH_ORDER_DETAIL) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === FETCH_PAST_NEXT_ORDERS) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === FETCH_UPCOMING_NEXT_ORDERS) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === REQUEST_CANCLE_ORDER) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      if (action.payload === FETCH_APPOINTMENT_DETAIL) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === FETCH_ORDER_HISTORY_DETAIL) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

    default:
      return state;
  }
}
