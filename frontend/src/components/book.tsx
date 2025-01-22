import { FormEvent, useState } from "react";
import { buyBook, createBook, updateBook } from "../api/books";
import { useNavigate } from "react-router-dom";

const Book = ({
  book = null,
  edit = false,
  create = false,
  admin = false,
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
  admin: boolean;
}) => {
  const navigate = useNavigate();

  // Objeto do Livro
  const [currentBook, setCurrentBook] = useState(
    book || {
      id: 0,
      title: "",
      author: "",
      price: 0,
      stock: 0,
    }
  );

  const handleBookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Atualiza o estado de forma imutável
    setCurrentBook((prevState) => ({
      ...prevState, // Copia os outros atributos
      [name]: value, // Atualiza o atributo específico
    }));
  };

  // Quantidade de Compras
  const [quantity, setQuantity] = useState(0);

  // Lidando com a alteração do formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Para Compra
    if (!edit && !create) {
      const data = await buyBook(currentBook.id, quantity);
      if (data.error) alert(data);
      else navigate(`/`);
      return;
    }

    // Para Edit
    if (edit && !create) {
      const data = await updateBook(currentBook);
      if (data.error) alert(data);
      else navigate(`/book/${currentBook.id}`);
    }

    // Para Create
    if (create) {
      const data = await createBook(currentBook);
      if (data.error) alert(data);
      else navigate(`/book/search?query=${currentBook.title}`);
    }

    return;
  };

  return (
    <div>
      <form className="container-fluid" onSubmit={handleSubmit}>
        {admin && !edit ? (
          <div className="d-flex w-25 justify-content-start px-5 mt-3">
            <a
              className="btn btn-sm btn-info me-1"
              href={`/book/${currentBook.id}/edit`}
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
                name="title"
                className="form-control form-control-lg"
                readOnly={!edit}
                value={currentBook.title}
                onChange={handleBookChange}
              />
            </div>
            {/* Autor */}
            <div data-mdb-input-init className="form-outline mb-4">
              <label className="form-label fs-3" htmlFor="author">
                Autor
              </label>
              <input
                id="author"
                name="author"
                className="form-control"
                readOnly={!edit}
                value={currentBook.author}
                onChange={handleBookChange}
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
                  name="stock"
                  type="number"
                  min="0"
                  readOnly={!edit}
                  className="form-control"
                  value={currentBook.stock}
                  onChange={handleBookChange}
                />
              </div>
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label fs-3" htmlFor="price">
                  Preço
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  className="form-control"
                  readOnly={!edit}
                  value={currentBook.price}
                  onChange={handleBookChange}
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
                    name="quantity"
                    type="number"
                    min={0}
                    max={currentBook.stock}
                    className="form-control"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                  <div className="d-flex">
                    <p>x R${currentBook.price} = </p>
                    <span className="fs-4">
                      R$ {quantity * currentBook.price}
                    </span>
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
      </form>
    </div>
  );
};

export default Book;
