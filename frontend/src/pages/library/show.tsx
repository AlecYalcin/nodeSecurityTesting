import { useParams } from "react-router-dom";
import Book from "../../components/book";
import { useEffect, useState } from "react";
import { retrieveBook } from "../../api/books";
import { retrieveUser } from "../../api/users";
import { getStorage } from "../../api/env-config";

const PageBookShow = () => {
  const [book, setBook] = useState({
    id: 0,
    title: "",
    author: "",
    price: 0,
    stock: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Pegando Token e Id
  const { id: user_id } = getStorage();

  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      setBook(await retrieveBook(Number(id)));
      setLoading(false);
    };

    const fetchUser = async () => {
      const data = await retrieveUser(Number(user_id));
      if (data.isAdmin === 1) setIsAdmin(true);
    };

    fetchUser();

    fetchBook();
  }, [id]);

  if (loading) return <h1 className="text-center">Carregando...</h1>;

  if (book?.id === undefined)
    return <h1 className="text-center">Nenhum livro encontrado.</h1>;

  return (
    <div className="bg-body-tertiary">
      <Book book={book} edit={false} create={false} admin={isAdmin} />
    </div>
  );
};

export default PageBookShow;
