import PaymentCard from "./payment-card";

const PaymentSearch = () => {
  const result = [
    { id: 1, user_id: 1, book_id: 1, total_price: 100, quantity: 20 },
    { id: 2, user_id: 1, book_id: 2, total_price: 298, quantity: 78 },
    { id: 3, user_id: 1, book_id: 3, total_price: 34, quantity: 2 },
  ];

  return (
    <div className="container mt-1 py-4 py-1">
      {/* Barra de Pesquisa */}
      <div className="container-fluid">
        <form className="d-flex justify-content-between">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Pesquise o id de algum pagamento."
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Pesquisar
          </button>
        </form>
      </div>

      {/* Linha divisória */}
      <hr />

      {/* Resultados da Pesquisa */}
      <div className="container-fluid">
        {result.map((payment) => {
          return (
            <div className="mb-2">
              <PaymentCard payment={payment} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentSearch;
