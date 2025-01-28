export const getFromCache = (key: string): any | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setToCache = (key: string, value: any, ttl: number): void => {
  const expiry = Date.now() + ttl * 1000;
  localStorage.setItem(key, JSON.stringify({ value, expiry }));

  // Limpa automaticamente após o TTL
  setTimeout(() => {
    const cachedItem = JSON.parse(localStorage.getItem(key) || "{}");
    if (cachedItem.expiry < Date.now()) {
      localStorage.removeItem(key);
    }
  }, ttl * 1000);
};
