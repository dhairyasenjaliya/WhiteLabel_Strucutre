import {
  API,
  SET_OTP_STATUS,
  FETCH_OTP_STATUS,
  SET_VERIFY_OTP,
  USER_LOGOUT,
  USER_EDIT,
  SET_USER_CURRENT_LOCATION,
} from '../actionType/type';
import {base_url} from '../../utils/api-configuration';
import * as RootNavigation from '../../navigation/rootNavigation';
import apiAction from '../apiAction/';
import {Alert} from 'react-native';
import axios from 'axios';

export function sendOtp(data: any) {
  return apiAction({
    url: `${base_url}auth/otp/`,
    onSuccess: otpSentSuccess,
    onFailure: otpError,
    label: FETCH_OTP_STATUS,
    data,
    param: data,
  });
}

// function otpSentSuccess(this: { url: string; onSuccess: (data: any) => { type: string; payload: any; }; onFailure: (Err: any) => { type: string; payload: any; }; label: string; data: any; param: any; }, data:any) {

function otpSentSuccess(data: any) {
  RootNavigation.navigate('otpScreen', {phoneNumber: data.param});
  return {
    type: SET_OTP_STATUS,
    payload: data,
  };
}

function otpError(Err: any) {
  Alert.alert(
    'Unable to send OTP Please Try Again ',
    JSON.stringify(Err.message),
  );
  console.log('otpError Reducer data==>>>', Err);
  return {
    type: SET_OTP_STATUS,
    payload: Err,
  };
}

export function verifyOtp(data: any) {
  console.log('verifyOtpCALLL', data);
  return apiAction({
    url: `${base_url}auth/login/`,
    onSuccess: verifyOtpSuccess,
    onFailure: verifyOtpError,
    label: FETCH_OTP_STATUS,
    data,
    param: data,
  });
}

function verifyOtpSuccess(data: any) {
  console.log('verifyOtpSuccess Reducer data==>>>', data.res);
  if (data && data.res && data.res.auth_token) {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${data.res.auth_token}`;
    RootNavigation.navigate('BottomTabs', {});
  }
  // Set User Number At First login...
  return {
    type: SET_VERIFY_OTP,
    payload: data.res,
  };
}

function verifyOtpError(Err: any) {
  Alert.alert('Invalid OTP Please Try Again', JSON.stringify(Err.message));
  return {
    type: SET_VERIFY_OTP,
    payload: Err,
  };
}

export function editUser(data: any) {
  console.log('editUse datar===>>', data);
  // return false;
  return apiAction({
    url: `${base_url}user/details/consumer`,
    onSuccess: userEditedSuccess,
    onFailure: userEditedErr,
    label: FETCH_OTP_STATUS,
    data,
    // param: data,
  });
}

function userEditedSuccess(data: any) {
  console.log('userEditedSuccess Reducer data==>>>', data.res.user);
  return {
    type: USER_EDIT,
    payload: data.res.user,
  };
}

function userEditedErr(Err: any) {
  Alert.alert('UserDataEdit', JSON.stringify(Err.message));
  // return {
  //   type: USER_EDIT,
  //   payload: Err,
  // };
}

export function userSignOut() {
  return apiAction({
    url: `${base_url}auth/logout`,
    onSuccess: userSignOutSuccess,
    // onFailure: userSignOutError,
    label: USER_LOGOUT,
  });
}

function userSignOutSuccess(data: any) {
  // console.log('userSignOutSuccess Reducer data==>>>', data.res.success);
  if (data.res.success) {
    RootNavigation.navigate('onBoard', {});
  }
  return {
    type: USER_LOGOUT,
    payload: [],
  };
}

export function setUserCurrentLocation(Data: any) {
  return {
    type: SET_USER_CURRENT_LOCATION,
    payload: Data,
  };
}
