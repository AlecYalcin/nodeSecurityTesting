const Book = ({ id }: { id: number }) => {
  const idReturn = () => {
    console.log(id);
  };

  idReturn();

  return (
    <div>
      <div className="container-fluid">
        <div id="upperBook" className="d-flex p-5">
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
              <input id="title" className="form-control form-control-lg" />
            </div>
            {/* Autor */}
            <div data-mdb-input-init className="form-outline mb-4">
              <label className="form-label fs-3" htmlFor="author">
                Autor
              </label>
              <input id="author" className="form-control" />
            </div>
            {/* Descrição */}
            <div data-mdb-input-init className="form-outline mb-4">
              <label className="form-label fs-3" htmlFor="description">
                Descrição
              </label>
              <textarea
                id="description"
                className="form-control"
                style={{ height: "12rem" }}
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
                <input id="stock" className="form-control" />
              </div>
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label fs-3" htmlFor="price">
                  Preço
                </label>
                <input id="price" className="form-control" />
              </div>
            </div>
            <div className="container d-flex justify-content-end w-100">
              <div className="me-2">
                <label className="form-label fs-5" htmlFor="quantity">
                  Quantidade
                </label>
                <input id="quantity" type="number" className="form-control" />
                <div className="d-flex">
                  <p>x R$0.00 = </p>
                  <span className="fs-4"> R$0.00</span>
                </div>
              </div>

              <button type="submit" className="btn btn-lg btn-success">
                Compre Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
