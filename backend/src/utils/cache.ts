import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

export default {
  get: (key: string) => cache.get(key),
  set: (key: string, value: any, ttl: number = 60) => cache.set(key, value, ttl),
  del: (key: string) => cache.del(key),
  flush: () => cache.flushAll(),
};
