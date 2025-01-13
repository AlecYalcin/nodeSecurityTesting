import { useParams } from "react-router-dom";
import Footer from "../../components/footer";
import User from "../../components/user";
import Navbar from "../../components/navbar";

const PageProfileShow = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="bg-body-tertiary">
      <Navbar />
      <User edit={false} />

      <div className="container mt-2">
        {/* Acessar Histórico */}
        <a className="btn btn-md btn-info me-2" href="/profile/1/history">
          Acessar Histórico de Compra
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

      <Footer />
    </div>
  );
};

export default PageProfileShow;
