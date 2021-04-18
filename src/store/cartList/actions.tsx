import {
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
import {base_url} from '../../utils/api-configuration';
import * as RootNavigation from '../../navigation/rootNavigation';
import apiAction from '../apiAction';
import {Alert} from 'react-native';
import {viewCart} from '../cartCheckout/actions';

export function addServiceInCart(data: any) {
  return {
    type: ADD_SERVICE_LIST,
    payload: data,
  };
}

export function addStylist(data: any) {
  return {
    type: SELECTED_STYLIST,
    payload: data,
  };
}

export function addSelectedDate(data: any) {
  // console.log('addSelectedDate', data);
  return {
    type: SELECTED_DATE,
    payload: data,
  };
}

export function addSelectedTime(data: any) {
  // console.log('addSelectedTime', data);
  return {
    type: SELECTED_TIME,
    payload: data,
  };
}

export function addServiceUuidMaster(data: Any) {
  // console.log('addServiceUuidMaster', data);
  return {
    type: ADD_SERVICE_UUID_MASTER,
    payload: data,
  };
}

// Get Available Stylist

export function getAvailableStylist(
  salonId: String,
  variationId: String,
  data: any,
) {
  return apiAction({
    url: `${base_url}salon/${salonId}/service/${variationId}/personnels`,
    onSuccess: getAvailableStylistSuccess,
    onFailure: getAvailableStylistError,
    label: AVAILABLE_STYLIST,
    data,
  });
}

function getAvailableStylistSuccess(data: any) {
  console.log('getAvailableStylistSuccess==>', data.res);
  return {
    type: AVAILABLE_STYLIST,
    payload: data.res,
  };
}

function getAvailableStylistError(Err: any) {
  Alert.alert(
    'Unable to fetch Available Stylist Error Please Try Again ',
    JSON.stringify(Err.message),
  );
  return {
    type: AVAILABLE_STYLIST,
    payload: Err,
  };
}

// Get Available Time Slot

export function getAvailableTimeSlot(
  salonId: String,
  stylistId: String,
  data: any,
) {
  return apiAction({
    url: `${base_url}salon/${salonId}/personnel/${stylistId}/appointment/slot/available`,
    onSuccess: getAvailableTimeSlotSuccess,
    onFailure: getAvailableTimeSlotError,
    label: AVAILABLE_TIME_SLOT,
    data,
  });
}

function getAvailableTimeSlotSuccess(data: any) {
  console.log('getAvailableTimeSlotSuccess==>');
  return {
    type: AVAILABLE_TIME_SLOT,
    payload: data.res,
  };
}

function getAvailableTimeSlotError(Err: any) {
  // Alert.alert(
  //   'Selected Date is fully occupied please try selecting another date',

  // );
  return {
    type: AVAILABLE_TIME_SLOT,
    payload: Err,
  };
}

// Add Service in API

export function addServiceAPI(consumerId: String, data: any) {
  // console.log('consumerId', consumerId);
  // console.log('data', data);
  return apiAction({
    url: `${base_url}consumer/${consumerId}/cart/service/add`,
    onSuccess: (d: any) => addServiceAPISuccess(d, consumerId),
    onFailure: addServiceAPIError,
    label: ADD_SERVICE_API,
    method: 'PUT',
    data,
  });
}

function addServiceAPISuccess(data: any, consumerId: any) {

  // RootNavigation.navigate('checkOutDetails');

  return dispatch => {
    dispatch(viewCart(consumerId));
    dispatch({
      type: ADD_SERVICE_API,
      payload: data.res,
    });
  };
}

function addServiceAPIError(Err: any) {
  console.log('addServiceAPIError==>', JSON.stringify(Err));
  Alert.alert(
    'Unable to add service please select another date',
    // JSON.stringify(Err.message),
  );
  return {
    type: ADD_SERVICE_API,
    payload: false,
  };
}

// Check Locally type of service

export function checkServiceType(data: object) {
  return {
    type: CHECK_SERVICE_TYPE,
    payload: data,
  };
}

// Add Schedule in API

export function addScheduleAPI(orderId: String, data: any) {
  // console.log('consumerId', consumerId);
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
  console.log('addSchedule APISuccess==>');
  // RootNavigation.navigate('checkOutDetails');
  return {
    type: ADD_SCHEDULE_API,
    payload: data.res,
  };
}

function addScheduleAPIAPIError(Err: any) {
  console.log('addSchedule APIError==>', JSON.stringify(Err));
  Alert.alert(
    'Unable to add service please select another date',
    // JSON.stringify(Err.message),
  );
  return {
    type: ADD_SCHEDULE_API,
    payload: false,
  };
}

// Get Available Date Slot

export function getAvailableDateSlot(
  salonId: String,
  stylistId: String,
  data: any,
) {
  return apiAction({
    url: `${base_url}salon/${salonId}/personnel/${stylistId}/appointment/date/available`,
    onSuccess: getAvailableDateSlotSuccess,
    onFailure: getAvailableDateSlotError,
    label: AVAILABLE_DATE_SLOT,
    method: 'GET',
    data,
  });
}

function getAvailableDateSlotSuccess(data: any) {
  console.log('getAvailableDateSlotSuccess==>');
  return {
    type: AVAILABLE_DATE_SLOT,
    payload: data.res,
  };
}

function getAvailableDateSlotError(Err: any) {
  Alert.alert(
    'Not able to get available date',
    // JSON.stringify(Err.message),
  );
  return {
    type: AVAILABLE_DATE_SLOT,
    payload: Err,
  };
}
