import { CacheService, LocalStorageService } from "./cache";

require("jasmine-check").install();

declare const check: any;
declare const gen: any;

describe("Test cacheService", () => {
  describe("Test get/set", () => {
    const localStorageCacheService = new CacheService(LocalStorageService);
    const mapCacheService = new CacheService(new Map());
    const key = "key";
    check.it("should be set and get strings", gen.string, (value: string) => {
      const localStorageCacheService = new CacheService(LocalStorageService);
      const mapCacheService = new CacheService(new Map());
      localStorageCacheService.set(key, value);
      mapCacheService.set(key, value);
      const localStorageCacheValue = localStorageCacheService.get(key);
      const mapCacheValue = mapCacheService.get(key);
      expect(localStorageCacheValue).toEqual(value);
      expect(mapCacheValue).toEqual(value);
    });
    check.it(
      "should be set and get numbers",
      gen.numberWithin(-1000000000, 1000000000),
      (value: number) => {
        const localStorageCacheService = new CacheService(LocalStorageService);
        const mapCacheService = new CacheService(new Map());
        if (value === -0) return;
        localStorageCacheService.set(key, value);
        mapCacheService.set(key, value);
        const localStorageCacheValue = localStorageCacheService.get(key);
        const mapCacheValue = mapCacheService.get(key);
        expect(localStorageCacheValue).toEqual(value);
        expect(mapCacheValue).toEqual(value);
      }
    );
    describe("should be set and get arrays", () => {
      check.it(
        "should be set and get num arrays",
        gen.array(gen.int),
        (value: number) => {
          if (value === -0) return;
          localStorageCacheService.set(key, value);
          mapCacheService.set(key, value);
          const localStorageCacheValue = localStorageCacheService.get(key);
          const mapCacheValue = mapCacheService.get(key);
          expect(localStorageCacheValue).toEqual(value);
          expect(mapCacheValue).toEqual(value);
        }
      );
      check.it(
        "should be set and get string arrays",
        gen.array(gen.string),
        (value: number) => {
          localStorageCacheService.set(key, value);
          mapCacheService.set(key, value);
          const localStorageCacheValue = localStorageCacheService.get(key);
          const mapCacheValue = mapCacheService.get(key);
          expect(localStorageCacheValue).toEqual(value);
          expect(mapCacheValue).toEqual(value);
        }
      );
      check.it(
        "should be set and get objects arrays",
        gen.array(gen.object(gen.int, gen.int)),
        (value: number) => {
          localStorageCacheService.set(key, value);
          mapCacheService.set(key, value);
          const localStorageCacheValue = localStorageCacheService.get(key);
          const mapCacheValue = mapCacheService.get(key);
          expect(localStorageCacheValue).toEqual(value);
          expect(mapCacheValue).toEqual(value);
        }
      );
      check.it(
        "should be set and get nested arrays",
        gen.nested(gen.array, gen.string),
        (value: number) => {
          localStorageCacheService.set(key, value);
          mapCacheService.set(key, value);
          const localStorageCacheValue = localStorageCacheService.get(key);
          const mapCacheValue = mapCacheService.get(key);
          expect(localStorageCacheValue).toEqual(value);
          expect(mapCacheValue).toEqual(value);
        }
      );
    });
  });
  describe("Test max-age", () => {
    const localStorageCacheService = new CacheService(LocalStorageService);
    const key = "key";
    describe("should set max age", () => {
      it("10", async () => {
        const time = 10;
        const testValue="Test value";
        localStorageCacheService.set(key, testValue);
        const cacheValue = localStorageCacheService.get(key, time);
        expect(cacheValue).toBe(testValue);
        await new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, time + 10);
        });
        const cacheValueAfterTime = localStorageCacheService.get(key, time);
        expect(cacheValueAfterTime).toBeFalsy();
      });
      it("50", async () => {
        const time = 10;
        const testValue="Test value";
        localStorageCacheService.set(key, testValue);
        const cacheValue = localStorageCacheService.get(key, time);
        expect(cacheValue).toBe(testValue);
        await new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, time + 10);
        });
        const cacheValueAfterTime = localStorageCacheService.get(key, time);
        expect(cacheValueAfterTime).toBeFalsy();
      });
      it("100", async () => {
        const time = 10;
        const testValue="Test value";
        localStorageCacheService.set(key, testValue);
        const cacheValue = localStorageCacheService.get(key, time);
        expect(cacheValue).toBe(testValue);
        await new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, time + 10);
        });
        const cacheValueAfterTime = localStorageCacheService.get(key, time);
        expect(cacheValueAfterTime).toBeFalsy();
      });
    });
  });
});
