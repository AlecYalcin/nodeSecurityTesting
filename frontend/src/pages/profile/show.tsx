import { useParams } from "react-router-dom";
import User from "../../components/user";

const PageProfileShow = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="bg-body-tertiary">
      <User edit={false} />

      <div className="container mt-2">
        {/* Acessar Histórico */}
        <a className="btn btn-md btn-info me-2" href="/profile/1/history">
          Acessar Histórico de Compra
        </a>

        {/* Realizar Transferência Bancária */}
        <a className="btn btn-md btn-warning me-2" href="/payment/transfer">
          Transferência Bancária
        </a>

        {/* Editar Conta */}
        <a className="btn btn-md btn-primary me-2" href="/profile/1/edit">
          Editar Conta
        </a>

        {/* Excluir Conta */}
        <a className="btn btn-md btn-danger" href="/profile/1/delete">
          Excluir Conta
        </a>
      </div>
    </div>
  );
};

export default PageProfileShow;
