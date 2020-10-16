export declare type MiddlewareType<T = any> = (res: T) => void;
export declare const setPromiseMiddleware: (promise: Promise<any>, middleware: MiddlewareType[]) => Promise<any>;
