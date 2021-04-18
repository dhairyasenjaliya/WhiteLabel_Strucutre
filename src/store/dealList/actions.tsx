import {
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
import {base_url} from '../../utils/api-configuration';
import * as RootNavigation from '../../navigation/rootNavigation';

import apiAction from '../apiAction';
// import * as RootNavigation from '../../navigation/rootNavigation';
// import {Alert} from 'react-native';

// Get All Deals List

export function getAllDealList(Data: any) {
  console.log('getAllDealList');
  return {
    type: FETCH_DEAL_LIST,
    payload: Data,
  };
}

// Deal Detail

export function getDealDetail(dealId: String) {
  // console.log('getOrderDetailorderId', dealId);
  return apiAction({
    url: `${base_url}deals/${dealId}`,
    onSuccess: getDealDetailSuccess,
    onFailure: getDealDetailError,
    label: DEAL_DETAIL,
    method: 'GET',
  });
}

function getDealDetailSuccess(data: any) {
  console.log('getDealDetailSuccess SUCCESS==>');
  return {
    type: DEAL_DETAIL,
    payload: data.res,
  };
}

function getDealDetailError(Err: any) {
  console.log('getDealDetailError==>', JSON.stringify(Err));
  return {
    type: DEAL_DETAIL,
    payload: Err.message,
  };
}

// List Deal Tag

export function getDealTag() {
  // console.log('getOrderDetailorderId', dealId);
  return apiAction({
    url: `${base_url}deals/tags`,
    onSuccess: getDealTagSuccess,
    onFailure: getDealTagError,
    label: LIST_DEAL_TAGS,
    method: 'GET',
  });
}

function getDealTagSuccess(data: any) {
  console.log('getDealTagSuccess==>');
  return {
    type: LIST_DEAL_TAGS,
    payload: data.res,
  };
}

function getDealTagError(Err: any) {
  console.log('getDealTagError==>', JSON.stringify(Err));
  return {
    type: LIST_DEAL_TAGS,
    payload: Err.message,
  };
}

// Deal Add/Remove In Cart

export function addDealInCart(consumerId: String, data: any) {
  console.log('getOrderDetailorderId', data);
  return apiAction({
    url: `${base_url}consumer/${consumerId}/cart/deal/add`,
    // /consumer/4323aa78-0d92-4a03-9cba-5fdfb43aa87e/cart/deal/add
    onSuccess: addDealInCartSuccess,
    onFailure: addDealInCartError,
    label: ADD_DEAL_CART,
    data,
    method: 'PUT',
  });
}

function addDealInCartSuccess(data: any) {
  RootNavigation.navigate('checkOutDeals');
  console.log('addDealInCartSuccess==>', data.res);
  return {
    type: ADD_DEAL_CART,
    payload: data.res,
  };
}

function addDealInCartError(Err: any) {
  console.log('addDealInCartError==>', JSON.stringify(Err));
  return {
    type: ADD_DEAL_CART,
    payload: Err.message,
  };
}

export function removeDealFromCart(consumerId: String, data) {
  // console.log('getOrderDetailorderId', dealId);
  return apiAction({
    url: `${base_url}consumer/${consumerId}/cart/deal/remove`,
    onSuccess: removeDealFromCartSuccess,
    onFailure: removeDealFromCartError,
    label: REMOVE_DEAL_CART,
    data,
    method: 'POST',
  });
}

function removeDealFromCartSuccess(data: any) {
  console.log('removeDealFromCartSuccess==>', data);
  return {
    type: REMOVE_DEAL_CART,
    payload: data.res,
  };
}

function removeDealFromCartError(Err: any) {
  console.log('removeDealFromCartError==>', JSON.stringify(Err));
  return {
    type: REMOVE_DEAL_CART,
    payload: Err.message,
  };
}

// Checkout Deal

export function checkOutDeal(consumerId: String, data: any) {
  return apiAction({
    url: `${base_url}consumer/${consumerId}/cart/checkout`,
    onSuccess: checkOutDealSuccess,
    onFailure: checkOutDealError,
    label: CHECKOUT_API_DEAL,
    data,
    method: 'POST',
  });
}

function checkOutDealSuccess(data: any) {
  console.log('checkOutDealSuccess==>');
  // let orderId = data && data.res && data.res.order && data.res.order.uuid;
  // if (orderId) {
  //   RootNavigation.navigate('dealDetailsFirst', {
  //     successAnimation: true,
  //     bookingId: orderId,
  //   });
  // }
  return {
    type: CHECKOUT_API_DEAL,
    payload: data.res,
  };
}

function checkOutDealError(Err: any) {
  console.log('checkOutDealError==>', Err);
  return {
    type: CHECKOUT_API_DEAL,
    payload: false,
  };
}

// Get Favourite Deal

export function getFavouriteDeal(consumerId: String) {
  return apiAction({
    url: `${base_url}consumers/${consumerId}/deals/favourite`,
    onSuccess: getFavouriteDealSuccess,
    onFailure: getFavouriteDealError,
    label: FETCH_FAVOURITE_DEAL,
    method: 'GET',
  });
}

function getFavouriteDealSuccess(data: any) {
  console.log('getFavouriteDealSuccess==>');
  return {
    type: FETCH_FAVOURITE_DEAL,
    payload: data.res,
  };
}

function getFavouriteDealError(Err: any) {
  console.log('getFavouriteDealError==>', JSON.stringify(Err));
  return {
    type: FETCH_FAVOURITE_DEAL,
    payload: Err.message,
  };
}

// Get Order By Next Line (Pagination)

export function getDealByNextLink(link: String) {
  console.log('getDealByNextLink', link);
  return apiAction({
    url: `${link}`,
    onSuccess: getDealByNextLinkSuccess,
    onFailure: getDalByNextLinkError,
    label: FETCH_PAST_FAV_DEAL_ORDERS,
    method: 'GET',
  });
}

function getDealByNextLinkSuccess(data: any) {
  console.log('getDealByNextLinkSuccess==>', data);
  return {
    type: FETCH_PAST_FAV_DEAL_ORDERS,
    payload: data.res,
  };
}

function getDalByNextLinkError(Err: any) {
  console.log('getDalByNextLinkError==>', Err);
  return {
    type: FETCH_PAST_FAV_DEAL_ORDERS,
    payload: Err.message,
  };
}

// Deal order Detail

export function getDealOrderDetail(dealOrderId: String) {
  // console.log('getOrderDetailorderId', orderId);
  return apiAction({
    url: `${base_url}orders/${dealOrderId}`,
    onSuccess: getDealOrderDetailSuccess,
    onFailure: getDealOrderDetailError,
    label: DEAL_ORDER_DETAIL,
    method: 'GET',
  });
}

function getDealOrderDetailSuccess(data: any) {
  console.log('getDealOrderDetail Success ==>', data);
  return {
    type: DEAL_ORDER_DETAIL,
    payload: data.res,
  };
}

function getDealOrderDetailError(Err: any) {
  console.log('getDealOrderDetail Error==>', JSON.stringify(Err));
  return {
    type: DEAL_ORDER_DETAIL,
    payload: Err.message,
  };
}

// Get All MyDeal's

export function getAllMyDeal(consumerId: String) {
  return apiAction({
    url: `${base_url}consumers/${consumerId}/orders?type=SALON_DEAL`,
    onSuccess: getAllMyDealSuccess,
    onFailure: getAllMyDealError,
    label: FETCH_MY_DEALS,
    method: 'GET',
  });
}

function getAllMyDealSuccess(data: any) {
  console.log('getAllMyDealSuccess==>');
  return {
    type: FETCH_MY_DEALS,
    payload: data.res,
  };
}

function getAllMyDealError(Err: any) {
  console.log('getAllMyDealError==>', JSON.stringify(Err));
  return {
    type: FETCH_MY_DEALS,
    payload: Err.message,
  };
}

// Get MyDeal By Next Line (Pagination)

export function getMyDealNextLink(link: String) {
  console.log('getMyDealNextLink', link);
  return apiAction({
    url: `${link}`,
    onSuccess: getMyDealNextLinkSuccess,
    onFailure: getMyDealNextLinkError,
    label: FETCH_MY_DEALS_NEXT,
    method: 'GET',
  });
}

function getMyDealNextLinkSuccess(data: any) {
  console.log('getMyDealNextLinkSuccess==>', data);
  return {
    type: FETCH_MY_DEALS_NEXT,
    payload: data.res,
  };
}

function getMyDealNextLinkError(Err: any) {
  console.log('getMyDealNextLinkError==>', Err);
  return {
    type: FETCH_MY_DEALS_NEXT,
    payload: Err.message,
  };
}

// Get Deal's Detail

export function getMyDealDetail(dealId: String) {
  return apiAction({
    url: `${base_url}orders/${dealId}`,
    onSuccess: getMyDealDetailSuccess,
    onFailure: getMyDealDetailError,
    label: FETCH_MY_DEAL_DETAIL,
    method: 'GET',
  });
}

function getMyDealDetailSuccess(data: any) {
  console.log('getMyDealDetailSuccess==>');
  return {
    type: FETCH_MY_DEAL_DETAIL,
    payload: data.res,
  };
}

function getMyDealDetailError(Err: any) {
  console.log('getMyDealDetailError==>', JSON.stringify(Err));
  return {
    type: FETCH_MY_DEAL_DETAIL,
    payload: Err.message,
  };
}
