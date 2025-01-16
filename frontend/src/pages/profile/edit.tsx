import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getStorage } from "../../api/env-config";
import { retrieveUser } from "../../api/users";

import { userInterface } from "../../api/users";

import User from "../../components/user";

const PageProfileEdit = () => {
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
      <User user={selectedUser} edit={true} />
    </div>
  );
};

export default PageProfileEdit;
