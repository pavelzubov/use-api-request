import { useEffect, useState } from "react";
import { MiddlewareType, setPromiseMiddleware } from "../../helpers/promise-middleware";
import { getCache, setCache } from '../../helpers/cache';

export type API_REQUEST_STATUS = "WAIT" | "PENDING" | "SUCCESS" | "FAIL";

type TNullValue = undefined;
export const nullValue = undefined;

type TRequest<T> = Promise<T>;

export interface TUseApiRequestProps<T = any> {
  cacheMaxAge?: number;
  alertService?: IAlertService;
  getErrorMessageCallback?: (error: any) => string;
  fetchOnMountData?: any;
  request: (...args: any) => TRequest<T>;
  defaultData?: T;
  catchCallback?: (error: any) => void;
  successMessage?: string;
  middleware?: MiddlewareType[];
  fetchOnMount?: boolean;
  token?: string;
  name?: string;
  cache?: boolean;
  interval?: number;
}

export interface TUseApiRequestOutput<T> {
  setData: (data: T | TNullValue) => void;
  status: API_REQUEST_STATUS;
  errorMessage: string;
  isPending: boolean;
  data: T | TNullValue;
  sendRequest: (props?: any) => TRequest<any>;
  cleanErrorMessage: () => void;
}

export interface IAlert {
  content: string;
  title?: string;
  image?: string;
  color?: string;
}

export interface IAlertService {
  successAlert: (alert: IAlert) => void;
  warningAlert: (alert: IAlert) => void;
  errorAlert: (alert: IAlert) => void;
}

const defaultGetErrorMessageCallback = (errorMessage: string) => errorMessage;

const useApiRequest = <T extends any>({
  cacheMaxAge,
  interval,
  token,
  name,
  cache,
  alertService,
  getErrorMessageCallback = defaultGetErrorMessageCallback,
  fetchOnMountData,
  fetchOnMount,
  middleware = [],
  successMessage,
  request,
  defaultData,
  catchCallback,
}: TUseApiRequestProps<T>): TUseApiRequestOutput<T> => {
  const [status, setStatus] = useState<API_REQUEST_STATUS>('WAIT');
  const [data, setData] = useState<T | TNullValue>(defaultData || nullValue);
  const [errorMessage, setErrorMessageState] = useState<string>("");
  const cleanErrorMessage = () => setErrorMessageState("");

  const [isPending, setIsPending] = useState<boolean>(false);

  const sendSuccessMessage = (res: any) => {
    if (successMessage && alertService)
      alertService.successAlert({ content: successMessage });
    setStatus("SUCCESS");
    return res;
  };

  const setCacheMiddleware = (res: any) => {
    if (cache && name) setCache(name, res, token);
    return res;
  };

  const middlewareList: MiddlewareType[] = [
    ...middleware,
    setCacheMiddleware,
    setData,
    cleanErrorMessage,
    sendSuccessMessage
  ];

  const sendFetchRequest = (request: TRequest<T>) => {
    setIsPending(true);
    setStatus("PENDING");
    return ((setPromiseMiddleware(
      request,
      middlewareList
    ) as unknown) as Promise<any>)
      .catch((error: any) => {
        const errorMessage = getErrorMessageCallback(error);
        setStatus("FAIL");
        setErrorMessageState(errorMessage);
        if (alertService) alertService.errorAlert({ content: errorMessage });
        catchCallback && catchCallback(error);
      })
      .finally(() => {
        setIsPending(false);
      }) as TRequest<T>;
  };

  const sendRequest = (props?: any) => {
    if (cache && name && !data) {
      const cacheValue = getCache(name, token, cacheMaxAge);
      if (cacheValue) sendFetchRequest(Promise.resolve(cacheValue));
    }
    return sendFetchRequest(request(props));
  };

  useEffect(() => {
    if (fetchOnMount) sendRequest(fetchOnMountData);
  }, []);

  useEffect(() => {
    let intervalData: number;
    const intervalInMs = (interval || 1000) * 1000;
    if (interval)
      setTimeout(() => {
        intervalData = setInterval(() => {
          sendRequest(fetchOnMountData);
        }, intervalInMs) as unknown as number;
      }, intervalInMs);
    return () => {
      intervalData && clearInterval(intervalData);
    };
  }, [interval]);

  return {
    setData,
    status,
    errorMessage,
    cleanErrorMessage,
    isPending,
    data,
    sendRequest,
  };
};

export default useApiRequest;
