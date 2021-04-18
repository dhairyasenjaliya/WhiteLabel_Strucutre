/* eslint-disable no-fallthrough */
import {
  API_START,
  API_END,
  SET_OTP_STATUS,
  FETCH_OTP_STATUS,
  SET_VERIFY_OTP,
  FETCH_VERIFY_OTP,
  USER_LOGOUT,
  USER_EDIT,
  SET_USER_CURRENT_LOCATION,
} from '../actionType/type';

const initialData = {
  status: '',
  isLoadingData: false,
  userNumber: '',
  otpVerify: false,
  userCurrentLocation: [],
};

export default function userReducer(state = initialData, action: any) {
  switch (action.type) {
    case SET_OTP_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    case SET_VERIFY_OTP:
      // console.log('SET_VERIFY_OTP_action.payload::', action.payload.user);
      return {
        // ...state,
        authToken: action.payload.auth_token,
        detail: action.payload.user,
      };

    case USER_EDIT:
      return {
        ...state,
        detail: action.payload,
      };

    case USER_LOGOUT:
      return {
        ...state,
        authToken: undefined,
        detail: undefined,
      };
    case SET_USER_CURRENT_LOCATION:
      return {
        ...state,
        userCurrentLocation: action.payload,
      };

    case API_START:
      if (action.payload === FETCH_OTP_STATUS) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === FETCH_VERIFY_OTP) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === USER_EDIT) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

      if (action.payload === USER_LOGOUT) {
        return {
          ...state,
          isLoadingData: true,
        };
      }

    case API_END:
      if (action.payload === FETCH_OTP_STATUS) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === FETCH_VERIFY_OTP) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === USER_EDIT) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

      if (action.payload === USER_LOGOUT) {
        return {
          ...state,
          isLoadingData: false,
        };
      }

    default:
      return state;
  }
}
