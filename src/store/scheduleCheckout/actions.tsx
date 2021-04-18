import {
  VIEW_SCHEDULE_CART,
  GET_ADDABLE_SERVICE,
  ADD_SCHEDULE_API,
  REMOVE_SCHEDULE_API,
  CHECKOUT_SCHEDULE_API,
  CANCEL_SCHEDULE_API,
} from '../actionType/type';
import {base_url} from '../../utils/api-configuration';
// import * as RootNavigation from '../../navigation/rootNavigation';
import apiAction from '../apiAction';

// Get Available Service From Cart

export function viewScheduleCart(orderId: String) {
  return apiAction({
    url: `${base_url}orders/${orderId}/appointments/cart`,
    onSuccess: getAvailableCartFromApi,
    onFailure: getAvailableCartError,
    label: VIEW_SCHEDULE_CART,
    method: 'GET',
  });
}

function getAvailableCartFromApi(data: any) {
  console.log('get Available Schedule Cart From Api==>');
  return {
    type: VIEW_SCHEDULE_CART,
    payload: data.res,
  };
}

function getAvailableCartError(Err: any) {
  console.log('get Available Schedule Cart ERROR==>', Err.res);
  return {
    type: VIEW_SCHEDULE_CART,
    payload: Err,
  };
}

export function getAddableServie(scheduleOrderId: String) {
  return apiAction({
    url: `${base_url}orders/${scheduleOrderId}/appointments/cart/addables`,
    onSuccess: getAddableServiceSuccess,
    onFailure: getAddableServiceError,
    label: GET_ADDABLE_SERVICE,
    method: 'GET',
  });
}

function getAddableServiceSuccess(data: any) {
  console.log('get Addable Service Cart Success ==>');
  return {
    type: GET_ADDABLE_SERVICE,
    payload: data.res,
  };
}

function getAddableServiceError(Err: any) {
  console.log('get Addable Service Cart ERROR ==>', Err.res);
  return {
    type: GET_ADDABLE_SERVICE,
    payload: Err,
  };
}

// Add Schedule in API

export function addScheduleAPI(orderId: String, data: any) {
  // console.log('data', data);
  // console.log('data', data);
  return apiAction({
    url: `${base_url}orders/${orderId}/appointments/cart/add`,
    onSuccess: addScheduleAPISuccess,
    onFailure: addScheduleAPIAPIError,
    label: ADD_SCHEDULE_API,
    method: 'PUT',
    data,
  });
}

function addScheduleAPISuccess(data: any) {
  console.log('add Schedule in APISuccess==>');
  // RootNavigation.navigate('checkOutDetails');
  return {
    type: ADD_SCHEDULE_API,
    payload: data.res,
  };
}

function addScheduleAPIAPIError(Err: any) {
  console.log('add Schedule in APIError==>', JSON.stringify(Err));
  alert(
    'Unable to add service please select another date',
    // JSON.stringify(Err.message),
  );
  return {
    type: ADD_SCHEDULE_API,
    payload: false,
  };
}

// Remove Schedule from api

export function removeScheduleAPI(orderId: String, data: any) {
  // console.log('consumerId', consumerId);
  // console.log('data', data);
  return apiAction({
    url: `${base_url}orders/${orderId}/appointments/cart/remove`,
    onSuccess: removeScheduleAPISuccess,
    onFailure: removeScheduleAPIError,
    label: REMOVE_SCHEDULE_API,
    method: 'POST',
    data,
  });
}

function removeScheduleAPISuccess(data: any) {
  console.log('remove Schedule in APISuccess==>');
  // RootNavigation.navigate('checkOutDetails');
  return {
    type: REMOVE_SCHEDULE_API,
    payload: data.res,
  };
}

function removeScheduleAPIError(Err: any) {
  console.log('remove Schedule in APIError==>', JSON.stringify(Err));
  alert(
    'Unable to remove Schedule  ',
    // JSON.stringify(Err.message),
  );
  return {
    type: REMOVE_SCHEDULE_API,
    payload: false,
  };
}

// Appointment Checkout

export function appointmentCheckout(orderId: String) {
  // console.log('consumerId', consumerId);
  // console.log('data', data);
  let data = {
    read: true,
  };
  return apiAction({
    url: `${base_url}orders/${orderId}/appointments/cart/checkout`,
    onSuccess: appointmentCheckoutSuccess,
    onFailure: appointmentCheckoutError,
    label: CHECKOUT_SCHEDULE_API,
    method: 'POST',
    data,
  });
}

function appointmentCheckoutSuccess(data: any) {
  console.log('appointmentCheckoutSuccess==>');
  // RootNavigation.navigate('checkOutDetails');
  return {
    type: CHECKOUT_SCHEDULE_API,
    payload: data.res,
  };
}

function appointmentCheckoutError(Err: any) {
  console.log('appointmentCheckoutError==>', JSON.stringify(Err));
  alert(
    'Unable to Checokut Appointment  ',
    // JSON.stringify(Err.message),
  );
  return {
    type: CHECKOUT_SCHEDULE_API,
    payload: false,
  };
}

// Appointment Cancel

export function appointmentCancel(orderId: String) {
  // console.log('consumerId', consumerId);
  // console.log('data', data);
  let data = {
    read: true,
  };
  return apiAction({
    url: `${base_url}appointments/${orderId}/cancel`,
    onSuccess: appointmentCancelSuccess,
    onFailure: appointmentCancelError,
    label: CANCEL_SCHEDULE_API,
    method: 'POST',
    data,
  });
}

function appointmentCancelSuccess(data: any) {
  console.log('appointmentCancelSuccess==>');
  // RootNavigation.navigate('checkOutDetails');
  return {
    type: CANCEL_SCHEDULE_API,
    payload: data.res,
  };
}

function appointmentCancelError(Err: any) {
  console.log('appointmentCancelError==>', JSON.stringify(Err));
  alert(
    'Unable to Cancel Appointment  ',
    // JSON.stringify(Err.message),
  );
  return {
    type: CANCEL_SCHEDULE_API,
    payload: false,
  };
}
