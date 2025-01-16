import { bookInterface } from "../api/books";
import BookCard from "./book-card";

const BookList = ({
  title,
  books,
}: {
  title: string;
  books: bookInterface[];
}) => {
  return (
    <div>
      <h1 className="fs-1 text-center m-2">{title}</h1>
      <div className="d-flex justify-content-between">
        {books.map((book, index) => {
          return (
            <div className="p-1" key={index}>
              <BookCard book={book} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookList;
