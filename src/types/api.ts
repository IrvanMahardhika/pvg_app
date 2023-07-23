export type ApiOptions = {
  path: string;
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  headers?: object;
  query?: object;
  data?: object;
  timeout?: number;
  responseType?: string;
};
