import { useEffect, useState } from "react";
import BookList from "../../components/book-list";
import { listBooks } from "../../api/books";

const App = () => {
  const [recent, setRecent] = useState([]);
  const [price, setPrice] = useState([]);
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
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
        }
      } catch (error) {
        alert(error);
      }
    };

    const fetchPrice = async () => {
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
        }
      } catch (error) {
        alert(error);
      }
    };

    const fetchStock = async () => {
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
        }
      } catch (error) {
        alert(error);
      }
    };

    const fetchAll = async () => {
      await fetchRecent();
      await fetchPrice();
      await fetchStock();

      setLoading(false);
    };

    fetchAll();
  }, []);

  if (loading) return <h1 className="text-center">Carregando...</h1>;

  return (
    <div className="bg-body-tertiary">
      {/* Main Page */}
      <div>
        <div className="container shadow text-center bg-body p-2 mt-3 mb-5">
          <BookList title="Novos lançamentos!" books={recent} />
        </div>

        <div className="container shadow text-center bg-body p-2 mt-3 mb-5">
          <BookList title="Melhores preços!" books={price} />
        </div>

        <div className="container shadow text-center bg-body p-2 mt-3 mb-5">
          <BookList title="Estão acabando!" books={stock} />
        </div>
      </div>
    </div>
  );
};

export default App;
