import axios, {AxiosRequestConfig, Method, ResponseType} from 'axios';

const createRequest = (apiConfig: {
  path: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  headers?: object;
  query?: object;
  data?: object;
  timeout?: number;
  responseType?: string;
}) => {
  const {
    path,
    method,
    headers = {},
    query = {},
    data = {},
    timeout = 0,
    responseType = 'json',
  } = apiConfig;
  const axiosConfig: AxiosRequestConfig = {
    url: path,
    method: method.toLowerCase() as Method,
    params: query,
    ...(method === 'GET' ? {} : {data}),
    headers,
    timeout,
    responseType: responseType as ResponseType,
  };
  return new Promise((resolve, reject) => {
    axios(axiosConfig)
      .then((response: unknown) => {
        return resolve(response);
      })
      .catch((error: unknown) => {
        return reject({error});
      });
  });
};

export default createRequest;
