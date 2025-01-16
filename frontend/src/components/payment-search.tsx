import { FormEvent, useState } from "react";
import { paymentInterface, paymentsList } from "../api/payments";
import PaymentCard from "./payment-card";

const PaymentSearch = () => {
  const [result, setResult] = useState<paymentInterface[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await paymentsList(null, Number(search));

      if (data.error) {
        alert(data.message);
      } else {
        setResult(data);
        setLoading(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container mt-1 py-4 py-1">
      {/* Barra de Pesquisa */}
      <div className="container-fluid">
        <form
          className="d-flex justify-content-between"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Pesquise o id de algum pagamento."
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
        {!loading ? (
          <div className="container-fluid">
            {result!.map((r, index) => {
              return (
                <div className="p-1" key={index}>
                  <PaymentCard payment={r} />
                </div>
              );
            })}
          </div>
        ) : (
          <h1 className="container-fluid text-center">
            Carregando Resultados...
          </h1>
        )}
      </div>
    </div>
  );
};

export default PaymentSearch;
