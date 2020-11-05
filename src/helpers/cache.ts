interface CacheValue {
  value: any;
  date: Date;
}

interface StorageService<K = string, T = any> {
  set: (key: K, value: T) => void;
  get: (key: K) => T | undefined;
  delete: (key: K) => void;
}

const CACHE_DURATION = 100 * 60 * 60 * 5;

export const getCacheKey = (name: string, token?: string) => {
  return name + token;
};

export const getCache = (name: string, token?: string): any => {
  const key = getCacheKey(name, token);
  return cacheService.get(key);
};

export const setCache = (name: string, value: any, token?: string) => {
  const key = getCacheKey(name, token);
  return cacheService.set(key, value);
};

const LocalStorageService: StorageService<string, CacheValue> = {
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

const isValidDate = (cacheValueDate: Date) => {
  const currentDate = new Date();
  return +currentDate - +new Date(cacheValueDate) <= CACHE_DURATION;
};

class CacheService {
  private cache: StorageService<string, CacheValue>;

  constructor() {
    this.cache = LocalStorageService;
  }

  set(key: string, value: any) {
    const cacheData: CacheValue = {
      value,
      date: new Date()
    };
    this.cache.set(key, cacheData);
  }

  get(key: string) {
    const cacheValue = this.cache.get(key);
    if (!cacheValue) return undefined;
    if (!isValidDate(cacheValue.date)) {
      this.cache.delete(key);
      return undefined;
    }
    return cacheValue.value;
  }
}

export const cacheService = new CacheService();
