import { FormEvent, useState } from "react";
import { updateUser, userInterface } from "../api/users";
import { useNavigate } from "react-router-dom";

const User = ({
  user,
  edit = false,
}: {
  user: userInterface;
  edit: boolean;
}) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(user);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Atualiza o estado de forma imutável
    setCurrentUser((prevState) => ({
      ...prevState, // Copia os outros atributos
      [name]: value, // Atualiza o atributo específico
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Caso não esteja em edição
    if (!edit) {
      alert("Permissão negada.");
      return;
    }

    try {
      const data = await updateUser(currentUser);

      if (data.error) {
        alert(data.message);
      } else {
        alert("Atualização feita com sucesso!");
        navigate(`/profile/${currentUser.id}`);
        return;
      }
    } catch (error) {
      alert(`Aconteceu um erro: ${error}`);
    }
  };

  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
        <div className="">
          <label className="form-label fs-2" htmlFor="title">
            Nome
          </label>
          <input
            id="name"
            name="name"
            className="form-control"
            disabled={!edit}
            value={currentUser.name}
            onChange={handleUserChange}
          />
        </div>
        <div className="">
          <label className="form-label fs-2" htmlFor="title">
            Email
          </label>
          <input
            id="email"
            name="email"
            className="form-control"
            disabled={!edit}
            value={currentUser.email}
            onChange={handleUserChange}
          />
        </div>
        <div className="">
          <label className="form-label fs-2" htmlFor="title">
            Conta Bancária
          </label>
          <input
            id="bank"
            min="0"
            step="0.01"
            type="number"
            name="bank"
            className="form-control"
            disabled={!edit}
            value={currentUser.bank}
            onChange={handleUserChange}
          />
        </div>

        {edit ? (
          <div className="mt-3">
            <button className="btn btn-md btn-outline-primary" type="submit">
              Confirmar Alterações
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </form>
    </div>
  );
};

export default User;
