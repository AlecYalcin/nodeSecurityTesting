import { useSearchParams } from "react-router-dom";
import BookSearch from "../../components/book-search";
import { useEffect, useState } from "react";
import { searchBooks } from "../../api/books";

const PageLibrarySearch = () => {
  // Filtro de Busca
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  // Respostas
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getResults = async () => {
      setResult(await searchBooks(query));
      setLoading(false);
    };

    getResults();
  }, [query]);

  if (loading) return <h1>Carregando...</h1>;

  return (
    <div className="bg-body-tertiary">
      <BookSearch list={result} />
    </div>
  );
};

export default PageLibrarySearch;
