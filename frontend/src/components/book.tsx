const Book = ({
  book = null,
  edit = false,
  create = false,
}: {
  book: {
    id: number;
    title: string;
    author: string;
    price: number;
    stock: number;
  } | null;
  edit: boolean;
  create: boolean;
}) => {
  const admin = true;

  return (
    <div>
      <div className="container-fluid">
        {admin && !edit ? (
          <div className="d-flex w-25 justify-content-start px-5 mt-3">
            <a
              className="btn btn-sm btn-info me-1"
              href={`/book/${book?.id}/edit`}
            >
              Edição
            </a>
            <a className="btn btn-sm btn-danger" href="">
              Excluir
            </a>
          </div>
        ) : (
          <div></div>
        )}

        <div id="upperBook" className="d-flex px-5 mt-3">
          {/* Imagem */}
          <img
            className="me-4"
            src="https://dummyimage.com/500x500/000/fff&text=Book"
            alt="imagemLivro"
          />

          {/* Título, Autor e Descrição */}
          <div className="container-fluid">
            {/* Título */}
            <div data-mdb-input-init className="form-outline mb-4">
              <label className="form-label fs-2" htmlFor="title">
                Título
              </label>
              <input
                id="title"
                className="form-control form-control-lg"
                readOnly={!edit}
                value={book?.title}
              />
            </div>
            {/* Autor */}
            <div data-mdb-input-init className="form-outline mb-4">
              <label className="form-label fs-3" htmlFor="author">
                Autor
              </label>
              <input
                id="author"
                className="form-control"
                readOnly={!edit}
                value={book?.author}
              />
            </div>
          </div>
        </div>

        <div id="bottomBook" className="container-fluid px-5">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div data-mdb-input-init className="form-outline mb-4 me-5">
                <label className="form-label fs-3" htmlFor="stock">
                  Estoque
                </label>
                <input
                  id="stock"
                  className="form-control"
                  value={book?.stock}
                />
              </div>
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label fs-3" htmlFor="price">
                  Preço
                </label>
                <input
                  id="price"
                  className="form-control"
                  readOnly={!edit}
                  value={book?.price}
                />
              </div>
            </div>
            {!edit ? (
              <div className="container d-flex justify-content-end w-100">
                <div className="me-2">
                  <label className="form-label fs-5" htmlFor="quantity">
                    Quantidade
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    className="form-control"
                    readOnly={!edit}
                  />
                  <div className="d-flex">
                    <p>x R$0.00 = </p>
                    <span className="fs-4"> R$0.00</span>
                  </div>
                </div>

                <button type="submit" className="btn btn-lg btn-success">
                  Compre Agora
                </button>
              </div>
            ) : (
              <div className="container d-flex justify-content-end w-100">
                {create ? (
                  <button type="submit" className="btn btn-lg btn-success">
                    Criar
                  </button>
                ) : (
                  <button type="submit" className="btn btn-lg btn-primary">
                    Editar
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
