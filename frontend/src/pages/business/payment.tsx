import { useParams } from "react-router-dom";

const Payment = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="container py-4">
      <h4 className="fs-4">
        Usuário: <span className="fs-5">1</span>
      </h4>
      <h4 className="fs-4">
        Livro: <span className="fs-5">1</span>
      </h4>
      <h4 className="fs-4">
        Quantidade: <span className="fs-5">12</span>
      </h4>
      <h4 className="fs-4">
        Total: <span className="fs-5">R$345</span>
      </h4>
    </div>
  );
};

export default Payment;
