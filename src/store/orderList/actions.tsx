import {
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
import {base_url} from '../../utils/api-configuration';
import * as RootNavigation from '../../navigation/rootNavigation';
import apiAction from '../apiAction';
import {Alert} from 'react-native';

// Get All Orders of Consumer

export function getAllOrder(consumerId: String, typeOfOrder: String) {
  return apiAction({
    url: `${base_url}consumers/${consumerId}/appointments?cat=${typeOfOrder}`,
    onSuccess: getAllOrderSuccess,
    onFailure: getAllOrderError,
    label:
      typeOfOrder === 'UPCOMING' ? FETCH_UPCOMING_ORDERS : FETCH_PAST_ORDERS,
    method: 'GET',
    param: typeOfOrder,
  });
}

function getAllOrderSuccess(data: any) {
  let orderType = data.param;
  console.log('getAllOrderSuccess==>');
  // RootNavigation.navigate('checkOutDetails');
  return {
    type: orderType === 'UPCOMING' ? FETCH_UPCOMING_ORDERS : FETCH_PAST_ORDERS,
    payload: data.res,
  };
}

function getAllOrderError(Err: any) {
  console.log('getAllOrderError==>', JSON.stringify(Err));
  return {
    type: ORDER_FETCH_ERROR,
    payload: Err.message,
  };
}

// Get Order By Next Line (Pagination)

export function getOrderByNextLink(link: String, typeOfOrder: String) {
  console.log('getOrderByNextLink', link, typeOfOrder);
  return apiAction({
    url: `${link}`,
    onSuccess: getNextOrderSuccess,
    onFailure: getNextOrderError,
    label:
      typeOfOrder === 'UPCOMING'
        ? FETCH_UPCOMING_NEXT_ORDERS
        : FETCH_PAST_NEXT_ORDERS,
    method: 'GET',
    param: typeOfOrder,
  });
}

function getNextOrderSuccess(data: any) {
  let orderType = data.param;
  console.log('getNextOrderSuccess==>');
  return {
    type:
      orderType === 'UPCOMING'
        ? FETCH_UPCOMING_NEXT_ORDERS
        : FETCH_PAST_NEXT_ORDERS,
    payload: data.res,
  };
}

function getNextOrderError(Err: any) {
  console.log('getNextOrderError==>', Err);
  return {
    type: FETCH_ORDER_DETAIL,
    payload: Err.message,
  };
}

// Get Order Particular Detail

export function getOrderDetail(orderId: String) {
  // console.log('getOrderDetailorderId', orderId);
  return apiAction({
    url: `${base_url}orders/${orderId}`,
    onSuccess: getOrderDetailSuccess,
    onFailure: getOrderDetailError,
    label: FETCH_ORDER_DETAIL,
    method: 'GET',
  });
}

function getOrderDetailSuccess(data: any) {
  // console.log('getOrderDetailSuccess==>', data);
  return {
    type: FETCH_ORDER_DETAIL,
    payload: data.res,
  };
}

function getOrderDetailError(Err: any) {
  console.log('getOrderDetailError==>', JSON.stringify(Err));
  return {
    type: FETCH_ORDER_DETAIL,
    payload: Err.message,
  };
}

// Cancle Order

export function orderCancle(orderId: String, data: any) {
  // console.log('getOrderDetailorderId', orderId);
  return apiAction({
    url: `${base_url}appointments/${orderId}/cancel`,
    onSuccess: orderCancleSuccess,
    onFailure: orderCancleError,
    label: REQUEST_CANCLE_ORDER,
    method: 'POST',
    data,
  });
}

function orderCancleSuccess(data: any) {
  console.log('orderCancleSuccess==>', data.res);
  return {
    type: REQUEST_CANCLE_ORDER,
    payload: data.res,
  };
}

function orderCancleError(Err: any) {
  console.log('orderCancleError==>', JSON.stringify(Err));
  return {
    type: REQUEST_CANCLE_ORDER,
    payload: Err.message,
  };
}

// Appointment Detail

export function getAppointmentDetail(orderId: String) {
  // console.log('getOrderDetailorderId', orderId);
  return apiAction({
    url: `${base_url}appointments/${orderId}`,
    onSuccess: getAppointmentSuccess,
    onFailure: getOrderAppointmentError,
    label: FETCH_APPOINTMENT_DETAIL,
    method: 'GET',
  });
}

function getAppointmentSuccess(data: any) {
  console.log('getAppointmentSuccess SUCCESS==>', data);
  return {
    type: FETCH_APPOINTMENT_DETAIL,
    payload: data.res,
  };
}

function getOrderAppointmentError(Err: any) {
  console.log('getOrderAppointmentError==>', JSON.stringify(Err));
  return {
    type: FETCH_APPOINTMENT_DETAIL,
    payload: Err.message,
  };
}

// Get Order History

export function getAllOrderHistory(consumerId: String) {
  return apiAction({
    url: `${base_url}consumers/${consumerId}/orders`,
    onSuccess: getAllOrderHistorySuccess,
    onFailure: getAllOrderHistoryError,
    label: FETCH_MY_ORDER_HISTORY,
    method: 'GET',
  });
}

function getAllOrderHistorySuccess(data: any) {
  console.log('getAllOrderHistory success==>');
  return {
    type: FETCH_MY_ORDER_HISTORY,
    payload: data.res,
  };
}

function getAllOrderHistoryError(Err: any) {
  console.log('getAllOrderHistory error==>', JSON.stringify(Err));
  return {
    type: FETCH_MY_ORDER_HISTORY,
    payload: Err.message,
  };
}

// Get OrderHistory By Next Line (Pagination)

export function getOrderHistoryNextLink(link: String) {
  console.log('getMyDealNextLink', link);
  return apiAction({
    url: `${link}`,
    onSuccess: getOrderHistoryNextLinkSuccess,
    onFailure: getOrderHistoryNextLinkError,
    label: FETCH_MY_ORDER_HISTORY_NEXT,
    method: 'GET',
  });
}

function getOrderHistoryNextLinkSuccess(data: any) {
  console.log('getOrderHistoryNextLinkSuccess==>', data);
  return {
    type: FETCH_MY_ORDER_HISTORY_NEXT,
    payload: data.res,
  };
}

function getOrderHistoryNextLinkError(Err: any) {
  console.log('getOrderHistoryNextLinkError==>', Err);
  return {
    type: FETCH_MY_ORDER_HISTORY_NEXT,
    payload: Err.message,
  };
}

// Get Order History Detail

export function getOrderHistoryDetail(orderID: String) {
  return apiAction({
    url: `${base_url}orders/${orderID}`,
    onSuccess: getOrderHistoryDetailSuccess,
    onFailure: getOrderHistoryDetailError,
    label: FETCH_ORDER_HISTORY_DETAIL,
    method: 'GET',
  });
}

function getOrderHistoryDetailSuccess(data: any) {
  console.log('getOrderHistoryDetail success==>');
  return {
    type: FETCH_ORDER_HISTORY_DETAIL,
    payload: data.res,
  };
}

function getOrderHistoryDetailError(Err: any) {
  console.log('getOrderHistoryDetail error==>', JSON.stringify(Err));
  return {
    type: FETCH_ORDER_HISTORY_DETAIL,
    payload: Err.message,
  };
}
