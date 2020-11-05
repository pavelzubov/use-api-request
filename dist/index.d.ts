declare const _default: {
    useApiRequest: <T extends unknown>({ token, name, cache, alertService, getErrorMessageCallback, fetchOnMountData, fetchOnMount, middleware, successMessage, request, defaultData, catchCallback }: import("./hooks/useApiRequest").TUseApiRequestProps<T>) => import("./hooks/useApiRequest").TUseApiRequestOutput<T>;
    getCache: (name: string, token?: string | undefined) => any;
    setCache: (name: string, value: any, token?: string | undefined) => void;
};
export default _default;
