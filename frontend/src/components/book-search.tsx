import BookCard from "./book-card";
import "../../public/css/books-grid.css";

const BookSearch = () => {
  const results = [
    {
      id: 1,
      title: "Livro 01",
      author: "O Testador",
      price: 12.99,
      quantity: 20,
    },
    {
      id: 2,
      title: "Livro 02",
      author: "O Testador",
      price: 10.72,
      quantity: 200,
    },
    {
      id: 3,
      title: "Livro 03",
      author: "O Testador",
      price: 9.8,
      quantity: 793,
    },
    {
      id: 4,
      title: "Livro 04",
      author: "O Testador",
      price: 19.8,
      quantity: 200,
    },
    {
      id: 5,
      title: "Livro 05",
      author: "O Testador",
      price: 299.8,
      quantity: 5,
    },
    {
      id: 5,
      title: "Livro 05",
      author: "O Testador",
      price: 299.8,
      quantity: 5,
    },
    {
      id: 5,
      title: "Livro 05",
      author: "O Testador",
      price: 299.8,
      quantity: 5,
    },
    {
      id: 5,
      title: "Livro 05",
      author: "O Testador",
      price: 299.8,
      quantity: 5,
    },
  ];

  return (
    <div className="container mt-1 py-4 py-1">
      {/* Resultados da Pesquisa */}
      <div className="books-grid">
        {results.map((book) => {
          return (
            <div className="p-1">
              <BookCard book={book} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookSearch;
