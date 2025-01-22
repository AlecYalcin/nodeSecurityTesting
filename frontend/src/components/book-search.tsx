import BookCard from "./book-card";
import "../../public/css/books-grid.css";

const BookSearch = ({
  list,
}: {
  list: {
    id: number;
    title: string;
    author: string;
    price: number;
    stock: number;
  }[];
}) => {
  return (
    <div className="container mt-1 py-4 py-1">
      {/* Resultados da Pesquisa */}
      {list.length < 1 ? (
        <h1 className="text-center">Resultados não encontrados</h1>
      ) : (
        <div className="books-grid">
          {list.map((book, index) => {
            return (
              <div className="p-1" key={index}>
                <BookCard book={book} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookSearch;
