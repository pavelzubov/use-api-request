interface CacheValue {
  value: any;
  date: Date;
}

interface StorageService<K = string, T = any> {
  set: (key: K, value: T) => void;
  get: (key: K) => T | undefined;
  delete: (key: K) => void;
}

const CACHE_MAX_AGE = 100 * 60 * 60 * 5;

export const getCacheKey = (name: string, token?: string) => {
  return name + token;
};

export const getCache = (name: string, token?: string, cacheMaxAge?: number): any => {
  const key = getCacheKey(name, token);
  return cacheService.get(key, cacheMaxAge);
};

export const setCache = (name: string, value: any, token?: string) => {
  const key = getCacheKey(name, token);
  return cacheService.set(key, value);
};

export const LocalStorageService: StorageService<string, CacheValue> = {
  set: (key: string, value: CacheValue) => {
    if (!localStorage) return;
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key: string) => {
    if (!localStorage) return undefined;
    const value = localStorage.getItem(key);
    if (!value) return undefined;
    return JSON.parse(value) as CacheValue;
  },
  delete: (key: string) => {
    if (!localStorage) return;
    localStorage.removeItem(key);
  }
};

const isValidDate = (cacheValueDate: Date, cacheMaxAge: number = CACHE_MAX_AGE) => {
  const currentDate = new Date();
  return +currentDate - +new Date(cacheValueDate) <= cacheMaxAge;
};

export class CacheService {
  private cache: StorageService<string, CacheValue>;

  constructor(service: StorageService<string, CacheValue>) {
    this.cache = service;
  }

  set(key: string, value: any) {
    const cacheData: CacheValue = {
      value,
      date: new Date()
    };
    this.cache.set(key, cacheData);
  }

  get(key: string, cacheMaxAge?: number) {
    const cacheValue = this.cache.get(key);
    if (!cacheValue) return undefined;
    if (!isValidDate(cacheValue.date, cacheMaxAge)) {
      this.cache.delete(key);
      return undefined;
    }
    return cacheValue.value;
  }
}

const currentStorageService: StorageService<string, CacheValue> =
  typeof window === 'undefined' ? new Map() : LocalStorageService;
export const cacheService = new CacheService(currentStorageService);
