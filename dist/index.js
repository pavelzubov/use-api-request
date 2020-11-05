Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var setPromiseMiddleware = function (promise, middleware) { return __awaiter(void 0, void 0, void 0, function () {
    var result, _i, middleware_1, middlewareItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, promise];
            case 1:
                result = _a.sent();
                _i = 0, middleware_1 = middleware;
                _a.label = 2;
            case 2:
                if (!(_i < middleware_1.length)) return [3 /*break*/, 5];
                middlewareItem = middleware_1[_i];
                return [4 /*yield*/, middlewareItem(result)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/, result];
        }
    });
}); };

var CACHE_DURATION = 100 * 60 * 60 * 5;
var getCacheKey = function (name, token) {
    return name + token;
};
var getCache = function (name, token) {
    var key = getCacheKey(name, token);
    return cacheService.get(key);
};
var setCache = function (name, value, token) {
    var key = getCacheKey(name, token);
    return cacheService.set(key, value);
};
var LocalStorageService = {
    set: function (key, value) {
        if (!localStorage)
            return;
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: function (key) {
        if (!localStorage)
            return undefined;
        var value = localStorage.getItem(key);
        if (!value)
            return undefined;
        return JSON.parse(value);
    },
    delete: function (key) {
        if (!localStorage)
            return;
        localStorage.removeItem(key);
    }
};
var isValidDate = function (cacheValueDate) {
    var currentDate = new Date();
    return +currentDate - +new Date(cacheValueDate) <= CACHE_DURATION;
};
var CacheService = /** @class */ (function () {
    function CacheService() {
        this.cache = LocalStorageService;
    }
    CacheService.prototype.set = function (key, value) {
        var cacheData = {
            value: value,
            date: new Date()
        };
        this.cache.set(key, cacheData);
    };
    CacheService.prototype.get = function (key) {
        var cacheValue = this.cache.get(key);
        if (!cacheValue)
            return undefined;
        if (!isValidDate(cacheValue.date)) {
            this.cache.delete(key);
            return undefined;
        }
        return cacheValue.value;
    };
    return CacheService;
}());
var cacheService = new CacheService();

var nullValue = undefined;
var defaultGetErrorMessageCallback = function (errorMessage) { return errorMessage; };
var useApiRequest = function (_a) {
    var interval = _a.interval, token = _a.token, name = _a.name, cache = _a.cache, alertService = _a.alertService, _b = _a.getErrorMessageCallback, getErrorMessageCallback = _b === void 0 ? defaultGetErrorMessageCallback : _b, fetchOnMountData = _a.fetchOnMountData, fetchOnMount = _a.fetchOnMount, _c = _a.middleware, middleware = _c === void 0 ? [] : _c, successMessage = _a.successMessage, request = _a.request, defaultData = _a.defaultData, catchCallback = _a.catchCallback;
    var _d = react.useState('WAIT'), status = _d[0], setStatus = _d[1];
    var _e = react.useState(defaultData || nullValue), data = _e[0], setData = _e[1];
    var _f = react.useState(""), errorMessage = _f[0], setErrorMessageState = _f[1];
    var setErrorMessage = function (error) {
        return setErrorMessageState(getErrorMessageCallback(error));
    };
    var cleanErrorMessage = function () { return setErrorMessageState(""); };
    var _g = react.useState(false), isPending = _g[0], setIsPending = _g[1];
    var sendSuccessMessage = function (res) {
        if (successMessage && alertService)
            alertService.successAlert({ content: successMessage });
        setStatus("SUCCESS");
        return res;
    };
    var setCacheMiddleware = function (res) {
        if (cache && name)
            setCache(name, res, token);
        return res;
    };
    var middlewareList = __spreadArrays(middleware, [
        setCacheMiddleware,
        setData,
        cleanErrorMessage,
        sendSuccessMessage
    ]);
    var sendFetchRequest = function (request) {
        setIsPending(true);
        setStatus("PENDING");
        return setPromiseMiddleware(request, middlewareList)
            .catch(function (error) {
            var errorMessage = getErrorMessageCallback(error);
            setStatus("FAIL");
            setErrorMessage(errorMessage);
            if (alertService)
                alertService.errorAlert({ content: errorMessage });
            catchCallback && catchCallback(error);
        })
            .finally(function () {
            setIsPending(false);
        });
    };
    var sendRequest = function (props) {
        if (cache && name && !data) {
            var cacheValue = getCache(name, token);
            if (cacheValue)
                sendFetchRequest(Promise.resolve(cacheValue));
        }
        return sendFetchRequest(request(props));
    };
    react.useEffect(function () {
        if (fetchOnMount)
            sendRequest(fetchOnMountData);
    }, []);
    react.useEffect(function () {
        var intervalData;
        var intervalInMs = (interval || 1000) * 1000;
        if (interval)
            setTimeout(function () {
                intervalData = setInterval(function () {
                    sendRequest(fetchOnMountData);
                }, intervalInMs);
            }, intervalInMs);
        return function () {
            intervalData && clearInterval(intervalData);
        };
    }, [interval]);
    return {
        setData: setData,
        status: status,
        errorMessage: errorMessage,
        cleanErrorMessage: cleanErrorMessage,
        isPending: isPending,
        data: data,
        sendRequest: sendRequest,
    };
};

var index = { useApiRequest: useApiRequest, getCache: getCache, setCache: setCache };

exports.default = index;
//# sourceMappingURL=index.js.map
