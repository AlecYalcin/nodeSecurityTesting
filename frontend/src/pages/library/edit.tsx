import { useParams } from "react-router-dom";
import Book from "../../components/book";
import { useEffect, useState } from "react";
import { retrieveBook } from "../../api/books";

const PageBookEdit = () => {
  const [book, setBook] = useState({
    id: 0,
    title: "",
    author: "",
    price: 0,
    stock: 0,
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      setBook(await retrieveBook(Number(id)));
      setLoading(false);
    };

    fetchBook();
  }, [id, book]);

  if (loading) return <h1 className="text-center">Carregando...</h1>;

  if (book?.id === undefined)
    return <h1 className="text-center">Nenhum livro encontrado.</h1>;

  return (
    <div className="bg-body-tertiary">
      <Book book={book} edit={true} create={false} admin={false} />
    </div>
  );
};
export default PageBookEdit;
