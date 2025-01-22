import { bookInterface } from "../api/books";
import BookCard from "./book-card";

const BookList = ({
  id,
  title,
  books,
}: {
  id: string;
  title: string;
  books: bookInterface[];
}) => {
  const identifyGroups = (limit: number) => {
    const groups = [];
    for (let i = 0; i < books.length; i += limit) {
      groups.push(books.slice(i, i + limit));
    }
    return groups;
  };

  const groupQuantity = identifyGroups(5);

  return (
    <div className="container-fluid">
      <h1 className="text-center">{title}</h1>
      <div id={id} className="carousel slide">
        <div className="carousel-inner">
          {groupQuantity.map((currentBooks, index) => {
            const isActive = index === 0 ? "active" : " ";

            return (
              <div className={`carousel-item ${isActive}`} key={index}>
                <div className="d-flex justify-content-between">
                  {currentBooks.map((book, index) => {
                    return (
                      <div className="p-1" key={index}>
                        <BookCard book={book} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        className="btn btn-md btn-primary me-2"
        type="button"
        data-bs-target={`#${id}`}
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button
        className="btn btn-md btn-primary"
        type="button"
        data-bs-target={`#${id}`}
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default BookList;
