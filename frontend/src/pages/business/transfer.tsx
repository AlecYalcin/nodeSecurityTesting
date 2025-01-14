const PagePaymentTransfer = () => {
  return (
    <div className="container py-4 text-center">
      <h1>Transferência Bancária</h1>
      <form>
        {/* Usuário para Enviar */}
        <label htmlFor="target_id">Usuário Destino</label>
        <input
          id="target_id"
          className="form-control mb-2"
          type="number"
          min="1"
        />

        {/* Quantidade a Enviar */}

        <label htmlFor="target_id">Quantidade</label>
        <input
          id="money"
          className="form-control"
          type="number"
          min="1"
          step="0.01"
        />

        <button type="submit" className="btn btn-md btn-success mt-3">
          Realizar Transferência
        </button>
      </form>
    </div>
  );
};

export default PagePaymentTransfer;
