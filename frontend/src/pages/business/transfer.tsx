import { FormEvent, useState } from "react";
import { getStorage } from "../../api/env-config";
import { paymentTransfer } from "../../api/payments";
import { useNavigate } from "react-router-dom";

const PagePaymentTransfer = () => {
  const navigate = useNavigate();

  const [target, setTarget] = useState(1);
  const [quantity, setQuantity] = useState(0);

  const { id } = getStorage();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await paymentTransfer(Number(id), target, quantity);

      if (data.error) {
        alert(data.message);
      } else {
        alert("Tranferência realizada com sucesso!");
        navigate("/");
        return;
      }
    } catch (error) {
      alert(`Aconteceu um erro: ${error}`);
    }
  };

  return (
    <div className="container py-4 text-center">
      <h1>Transferência Bancária</h1>
      <form onSubmit={handleSubmit}>
        {/* Usuário para Enviar */}
        <label htmlFor="target_id">Usuário Destino</label>
        <input
          id="target_id"
          className="form-control mb-2"
          type="number"
          min="1"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
        />

        {/* Quantidade a Enviar */}

        <label htmlFor="target_id">Quantidade</label>
        <input
          id="money"
          className="form-control"
          type="number"
          min="1"
          step="0.01"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <button type="submit" className="btn btn-md btn-success mt-3">
          Realizar Transferência
        </button>
      </form>
    </div>
  );
};

export default PagePaymentTransfer;
