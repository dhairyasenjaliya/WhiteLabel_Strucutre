import {
  VIEW_CART,
  CHECKOUT_API,
  REMOVE_SERVICE_API,
  FETCH_AVAILABLE_PAYMENT_OPTION,
  RAZOR_PAY_INIT,
  RAZOR_PAY_VERIFY,
} from '../actionType/type';
import {base_url, SalonId} from '../../utils/api-configuration';
import * as RootNavigation from '../../navigation/rootNavigation';
import apiAction from '../apiAction';

// Get Available Service From Cart

export function viewCart(consumerId: String) {
  return apiAction({
    url: `${base_url}consumer/${consumerId}/cart`,
    onSuccess: getAvailableCartFromApi,
    onFailure: getAvailableCartError,
    label: VIEW_CART,
    method: 'GET',
  });
}

function getAvailableCartFromApi(data: any) {
  console.log('get Available Cart From Api==>');
  return {
    type: VIEW_CART,
    payload: data.res,
  };
}

function getAvailableCartError(Err: any) {
  console.log('get Available Cart ERROR==>', Err.res);
  return {
    type: VIEW_CART,
    payload: Err,
  };
}

// Checkout Cart

export function checkOutApi(consumerId: String, data: any) {
  return apiAction({
    url: `${base_url}consumer/${consumerId}/cart/checkout`,
    onSuccess: checkOutSuccess,
    onFailure: checkOutError,
    label: CHECKOUT_API,
    data,
    // method: 'POST',
  });
}

function checkOutSuccess(data: any) {
  // let orderId = data && data.res && data.res.uuid;
  // console.log('checkOutSuccess', data.res);
  let orderId = data && data.res && data.res.order && data.res.order.uuid;
  if (orderId) {
    // RootNavigation.navigate('bookingDetails', {
    //   successAnimation: true,
    //   bookingId: orderId,
    // });
  } else {
    alert('Sorry Somthing Went Wrong');
    // RootNavigation.navigate('homescreen');
  }
  console.log('checkOutSuccess==>');
  return {
    type: CHECKOUT_API,
    payload: data.res,
  };
}

function checkOutError(Err: any) {
  alert('Something went wrong ');
  console.log('checkOutError==>', Err);
  return {
    type: CHECKOUT_API,
    payload: false,
  };
}

// Remove Service From Cart

export function removeServiceCart(consumerId: String, data: any) {
  return apiAction({
    url: `${base_url}consumer/${consumerId}/cart/service/remove`,
    onSuccess: removeServiceCartSuccess,
    onFailure: removeServiceCartError,
    label: REMOVE_SERVICE_API,
    data,
  });
}

function removeServiceCartSuccess(data: any) {
  console.log('removeServiceCartSuccess==>');
  return {
    type: REMOVE_SERVICE_API,
    payload: data.res,
  };
}

function removeServiceCartError(Err: any) {
  console.log('checkOutError==>', Err);
  return {
    type: REMOVE_SERVICE_API,
    payload: Err,
  };
}

// Get Available Payment Option

export function getAvailablePaymentOption() {
  return apiAction({
    url: `${base_url}payments/options?salon_uuid=${SalonId}`,
    onSuccess: getAvailablePaymentOptionSuccess,
    onFailure: getAvailablePaymentOptionError,
    method: 'GET',
    label: FETCH_AVAILABLE_PAYMENT_OPTION,
  });
}

function getAvailablePaymentOptionSuccess(data: any) {
  console.log('getAvailablePaymentOptionSuccess==>');
  return {
    type: FETCH_AVAILABLE_PAYMENT_OPTION,
    payload: data.res,
  };
}

function getAvailablePaymentOptionError(Err: any) {
  console.log('getAvailablePaymentOptionError==>', Err);
  return {
    type: FETCH_AVAILABLE_PAYMENT_OPTION,
    payload: Err,
  };
}

// RazorPay Init

export function razorPayInit(data: any) {
  return apiAction({
    url: `${base_url}payments/options/razorpay/create/order`,
    onSuccess: razorPayInitSuccess,
    onFailure: razorPayInitError,
    // method: 'GET',
    label: RAZOR_PAY_INIT,
    data,
  });
}

function razorPayInitSuccess(data: any) {
  console.log('razorPayInitSUccess==>');
  return {
    type: RAZOR_PAY_INIT,
    payload: data.res,
  };
}

function razorPayInitError(Err: any) {
  console.log('razorPayInitError==>', Err);
  return {
    type: RAZOR_PAY_INIT,
    payload: Err,
  };
}

// RazorPay Verify

export function razorPayVerify(data: any) {
  return apiAction({
    url: `${base_url}payments/options/razorpay/verify/order`,
    onSuccess: razorPayVerifySuccess,
    onFailure: razorPayVerifyError,
    // method: 'GET',
    label: RAZOR_PAY_VERIFY,
    data,
  });
}

function razorPayVerifySuccess(data: any) {
  console.log('RAZOR_PAY_VERIFY SUCCESS==>', data);
  return {
    type: RAZOR_PAY_VERIFY,
    payload: data.res,
  };
}

function razorPayVerifyError(Err: any) {
  console.log('RAZOR_PAY_VERIFY_ERROR==>', Err);
  return {
    type: RAZOR_PAY_VERIFY,
    payload: Err,
  };
}
