import { API_START, API_END, ACCESS_DENIED, API_ERROR } from "./type";

export const apiStart = (label:any) => ({
  type: API_START,
  payload: label,
});

export const apiEnd = (label:any) => ({
  type: API_END,
  payload: label,
});

export const accessDenied = (url:any) => ({
  type: ACCESS_DENIED,
  payload: {
    url,
  },
});

export const apiError = (error:any) => ({
  type: API_ERROR,
  error,
});
