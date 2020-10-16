import { MiddlewareType } from "../../helpers/promise-middleware";
export declare type API_REQUEST_STATUS = "WAIT" | "PENDING" | "SUCCESS" | "FAIL";
declare type TNullValue = undefined;
export declare const nullValue: undefined;
declare type TRequest<T> = Promise<T>;
export interface TUseApiRequestProps<T = any> {
    alertService?: IAlertService;
    getErrorMessageCallback?: (error: any) => string;
    fetchOnMountData?: any;
    request: (...args: any) => TRequest<T>;
    defaultData?: T;
    catchCallback?: (error: any) => void;
    successMessage?: string;
    middleware?: MiddlewareType[];
    fetchOnMount?: boolean;
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
declare const useApiRequest: <T extends unknown>({ alertService, getErrorMessageCallback, fetchOnMountData, fetchOnMount, middleware, successMessage, request, defaultData, catchCallback }: TUseApiRequestProps<T>) => TUseApiRequestOutput<T>;
export default useApiRequest;
