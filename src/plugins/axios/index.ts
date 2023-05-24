import axios, {
  AxiosError,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
  RawAxiosResponseHeaders,
} from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

axios.interceptors.response.use(
  function (response) {
    return { ...response, success: true };
  },
  function (error: AxiosError<any>): IResponse<any> {
    if (error.response) {
      const response = error.response;
      let message = response.data.message;

      if (!navigator.onLine) {
        message = "No internet connection";
      }
      return { ...response, message, success: false };
    } else if (error.request) {
      return { ...error.response!, message: "Network error", success: false };
    } else {
      return { ...error.response!, message: "Network error", success: false };
    }
  }
);

export interface IResponse<T> {
  config: InternalAxiosRequestConfig;
  data: T;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  request?: any;
  status: number;
  statusText: string;
  // Thuộc tính custom
  success?: boolean;
  message?: string;
}
