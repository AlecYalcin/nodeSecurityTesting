const BookCard = ({
  book,
}: {
  book: {
    id: number;
    title: string;
    author: string;
    price: number;
    stock: number;
  };
}) => {
  return (
    <div>
      <a href={`/book/${book.id}`} className="text-decoration-none">
        <div className="card text-center bg-light-subtle p-1">
          <img
            src="https://dummyimage.com/300x300/000/fff&text=Book"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body d-flex flex-column align-items-center">
            <div>
              <h5
                className="fs-4 mb-1 text-truncate"
                style={{ maxWidth: "200px", whiteSpace: "nowrap" }}
              >
                {book.title}
              </h5>
              <h6 className="fs-6 text-secondary">{book.author}</h6>
            </div>
            <div>
              <p className="fs-4 mb-0 text-success">R${book.price}</p>
              <p className="fs-6 mt-0 text-danger">{book.stock} unidades</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default BookCard;
