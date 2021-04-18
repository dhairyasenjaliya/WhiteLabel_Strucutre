/* eslint-disable no-fallthrough */
import {
  API_START,
  API_END,
  DEAL_DETAIL,
  FETCH_DEAL_LIST,
  LIST_DEAL_TAGS,
  ADD_DEAL_CART,
  REMOVE_DEAL_CART,
  CHECKOUT_API_DEAL,
  FETCH_FAVOURITE_DEAL,
  DEAL_ORDER_DETAIL,
  FETCH_PAST_FAV_DEAL_ORDERS,
  FETCH_MY_DEALS,
  FETCH_MY_DEAL_DETAIL,
  FETCH_MY_DEALS_NEXT,
  FETCH_MY_ORDER_HISTORY,
} from '../actionType/type';

const initialData = {
  isLoadingData: false,
  listDealAll: [],
  dealDetail: [],
  tagName: [],
  cartDealList: [],
  checkoutCheck: [],
  favouriteDeal: [],
  favouriteDealNext: [],
  dealOrderDetail: [],
  myAllDeals: [],
  myDealsNext: [],
  myDealDetail: [],
};

export default function dealListReducer(state = initialData, action: any) {
  switch (action.type) {
    case FETCH_DEAL_LIST:
      return {
        ...state,
        listDealAll: action.payload,
      };

    case FETCH_MY_ORDER_HISTORY:
      return {
        ...state,
        myOrderHistory: action.payload,
      };

    case FETCH_MY_DEAL_DETAIL:
      return {
        ...state,
        myDealDetail: action.payload,
      };
    case FETCH_MY_DEALS_NEXT:
      return {
        ...state,
        myDealsNext: action.payload,
      };

    case FETCH_MY_DEALS:
      return {
        ...state,
        myAllDeals: action.payload,
      };

    case FETCH_PAST_FAV_DEAL_ORDERS:
      return {
        ...state,
        favouriteDealNext: action.payload,
      };

    case DEAL_ORDER_DETAIL:
      return {
        ...state,
        dealOrderDetail: action.payload,
      };

    case DEAL_DETAIL:
      return {
        ...state,
        dealDetail: action.payload,
      };
    case LIST_DEAL_TAGS:
      return {
        ...state,
        tagName: action.payload,
      };
    case ADD_DEAL_CART:
      return {
        ...state,
        cartDealList: action.payload,
      };

    case REMOVE_DEAL_CART:
      return {
        ...state,
        cartDealList: action.payload,
      };
    case CHECKOUT_API_DEAL:
      return {
        ...state,
        checkoutCheck: action.payload,
      };

    case FETCH_FAVOURITE_DEAL:
      return {
        ...state,
        favouriteDeal: action.payload,
      };

    case API_START:
      if (action.payload === FETCH_PAST_FAV_DEAL_ORDERS) {
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

      if (action.payload === FETCH_MY_DEALS) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === DEAL_ORDER_DETAIL) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      if (action.payload === FETCH_DEAL_LIST) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === FETCH_FAVOURITE_DEAL) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === CHECKOUT_API_DEAL) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === ADD_DEAL_CART) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === REMOVE_DEAL_CART) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === DEAL_DETAIL) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === LIST_DEAL_TAGS) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === FETCH_MY_DEAL_DETAIL) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      if (action.payload === FETCH_MY_DEALS_NEXT) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

    case API_END:
      if (action.payload === DEAL_ORDER_DETAIL) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === FETCH_MY_DEALS) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === FETCH_DEAL_LIST) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === FETCH_FAVOURITE_DEAL) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === DEAL_DETAIL) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === LIST_DEAL_TAGS) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === ADD_DEAL_CART) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === REMOVE_DEAL_CART) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === CHECKOUT_API_DEAL) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === FETCH_PAST_FAV_DEAL_ORDERS) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === FETCH_MY_DEAL_DETAIL) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === FETCH_MY_DEALS_NEXT) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

    default:
      return state;
  }
}
