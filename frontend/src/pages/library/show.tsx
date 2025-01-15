import { useParams } from "react-router-dom";
import Book from "../../components/book";
import { useEffect, useState } from "react";
import { retrieveBook } from "../../api/books";

const PageBookShow = ({
  bookResult = null,
}: {
  bookResult: {
    id: number;
    title: string;
    author: string;
    price: number;
    stock: number;
  } | null;
}) => {
  const [book, setBook] = useState(bookResult);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      setBook(await retrieveBook(Number(id)));
      setLoading(false);
    };

    if (book == null) fetchBook();
  }, [id, book]);

  if (loading) return <h1>Carregando...</h1>;

  return (
    <div className="bg-body-tertiary">
      <Book book={book} edit={false} create={false} />
    </div>
  );
};

export default PageBookShow;
