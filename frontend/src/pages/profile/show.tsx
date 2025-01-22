import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getStorage } from "../../api/env-config";
import { retrieveUser } from "../../api/users";

import { userInterface } from "../../api/users";

import User from "../../components/user";

const PageProfileShow = () => {
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState<userInterface>({
    id: 0,
    name: "",
    email: "",
    isAdmin: false,
    bank: 0,
  });

  // Loading
  const [loading, setLoading] = useState(true);

  // Id do Usuário
  const { id } = useParams();

  // ID Salvo
  const { id: user_id } = getStorage();

  useEffect(() => {
    const fetchSelectedUser = async () => {
      const data = await retrieveUser(Number(id));
      return data;
    };

    const fetchUser = async () => {
      const data = await retrieveUser(Number(user_id));
      return data;
    };

    const fetchAll = async () => {
      try {
        const currentUser = await fetchUser();

        if (currentUser!.isAdmin || user_id === id) {
          const getUser = await fetchSelectedUser();
          setSelectedUser(getUser);
        } else {
          alert("Não foi possível recuperar esses dados.");
          navigate("/");
        }

        setLoading(false);

        return;
      } catch (error) {
        alert(error);
        navigate("/");
      }
    };

    fetchAll();
  }, [id, navigate, user_id]);

  if (loading) return <h1 className="text-center">Carregando...</h1>;

  return (
    <div className="bg-body-tertiary">
      <User user={selectedUser} edit={false} />

      <div className="container mt-2">
        {/* Acessar Histórico */}
        <a
          className="btn btn-md btn-info me-2"
          href={`/profile/${user_id}/history`}
        >
          Acessar Histórico de Compra
        </a>

        {/* Realizar Transferência Bancária */}
        <a className="btn btn-md btn-warning me-2" href="/payment/transfer">
          Transferência Bancária
        </a>

        {/* Editar Conta */}
        <a
          className="btn btn-md btn-primary me-2"
          href={`/profile/${user_id}/edit`}
        >
          Editar Conta
        </a>

        {/* Excluir Conta */}
        <a
          className="btn btn-md btn-danger"
          href={`/profile/${user_id}/delete`}
        >
          Excluir Conta
        </a>
      </div>
    </div>
  );
};

export default PageProfileShow;
