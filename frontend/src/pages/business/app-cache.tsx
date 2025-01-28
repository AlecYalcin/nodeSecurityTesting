import { getFromCache, setToCache } from "../../../utils/cache";
import App from "./app";

const AppWithCache = () => {
  const cachedData = getFromCache("homeData");

  if (cachedData) {
    return <App onFetchData={cachedData} />;
  }

  return (
    <App
      onFetchData={(fetchedData: unknown) => {
        setToCache("homeData", fetchedData, 300);
      }}
    />
  );
};

export default AppWithCache;
