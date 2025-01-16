import { FormEvent, useState } from "react";
import UserCard from "./user-card";
import { searchUser, userInterface } from "../api/users";

const UserSearch = () => {
  const [result, setResult] = useState<userInterface[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await searchUser(search);

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
            placeholder="Pesquise pelo nome de algum usuário."
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
      {!loading ? (
        <div className="container-fluid">
          {result!.map((r) => {
            return (
              <a
                className="mb-1 text-decoration-none"
                href={`/profile/${r.id}`}
              >
                <UserCard user={r} />
              </a>
            );
          })}
        </div>
      ) : (
        <h1 className="container-fluid text-center">
          Carregando Resultados...
        </h1>
      )}
    </div>
  );
};

export default UserSearch;
