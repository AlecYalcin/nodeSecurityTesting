import { useEffect, useState } from "react";
import BookList from "../../components/book-list";
import { listBooks } from "../../api/books";
import { getFromCache, setToCache } from "../../../utils/cache";

interface AppProps {
  initialData?: unknown;
  onFetchData?: (fetchedData: unknown) => void;
}

interface bookInterface {
  id: number;
  title: string;
  author: string;
  price: number;
  stock: number;
}

const App: React.FC<AppProps> = ({ onFetchData }) => {
  const [recent, setRecent] = useState<bookInterface[]>([]);
  const [price, setPrice] = useState<bookInterface[]>([]);
  const [stock, setStock] = useState<bookInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      const cacheKey = "recentBooks";
      const cachedData = getFromCache(cacheKey);

      if (cachedData) {
        setRecent(cachedData.value);
      } else {
        try {
          const data = await listBooks({
            recent: true,
            price: false,
            stock: false,
          });

          if (data.error) {
            alert(data.message);
          } else {
            setRecent(data);
            setToCache(cacheKey, data, 3600);
            if (onFetchData) onFetchData(data); // callnack fornecido
          }
        } catch (error) {
          alert(error);
        }
      }
    };

    const fetchPrice = async () => {
      const cacheKey = "priceBooks";
      const cachedData = getFromCache(cacheKey);

      if (cachedData) {
        setPrice(cachedData.value);
      } else {
        try {
          const data = await listBooks({
            recent: false,
            price: true,
            stock: false,
          });

          if (data.error) {
            alert(data.message);
          } else {
            setPrice(data);
            setToCache(cacheKey, data, 3600);
            if (onFetchData) onFetchData(data); // callnack fornecido
          }
        } catch (error) {
          alert(error);
        }
      }
    };

    const fetchStock = async () => {
      const cacheKey = "stockBooks";
      const cachedData = getFromCache(cacheKey);

      if (cachedData) {
        setStock(cachedData.value);
      } else {
        try {
          const data = await listBooks({
            recent: false,
            price: false,
            stock: true,
          });

          if (data.error) {
            alert(data.message);
          } else {
            setStock(data);
            setToCache(cacheKey, data, 3600);
            if (onFetchData) onFetchData(data); // callnack fornecido
          }
        } catch (error) {
          alert(error);
        }
      }
    };

    const fetchAll = async () => {
      await fetchRecent();
      await fetchPrice();
      await fetchStock();
      setLoading(false);
    };

    fetchAll();
  }, [onFetchData]);

  if (loading) return <h1 className="text-center">Carregando...</h1>;

  return (
    <div className="bg-body-tertiary">
      <div>
        <div className="container shadow text-center bg-body p-2 mt-3 mb-5">
          <BookList id="new" title="Novos lançamentos!" books={recent} />
        </div>

        <div className="container shadow text-center bg-body p-2 mt-3 mb-5">
          <BookList id="prices" title="Melhores preços!" books={price} />
        </div>

        <div className="container shadow text-center bg-body p-2 mt-3 mb-5">
          <BookList id="stock" title="Estão acabando!" books={stock} />
        </div>
      </div>
    </div>
  );
};

export default App;
