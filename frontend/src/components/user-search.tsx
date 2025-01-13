import UserCard from "./user-card";

const UserSearch = () => {
  const results = [
    { id: 1, name: "Teste 1", email: "teste1@teste.com" },
    { id: 2, name: "Teste 2", email: "teste2@teste.com" },
    { id: 3, name: "Teste 3", email: "teste3@teste.com" },
  ];

  return (
    <div className="container mt-1 py-4 py-1">
      {/* Barra de Pesquisa */}
      <div className="container-fluid">
        <form className="d-flex justify-content-between">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Pesquise pelo nome de algum usuário."
            aria-label="Search"
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
        {results.map((r) => {
          return (
            <a className="mb-1 text-decoration-none" href={`/profile/${r.id}`}>
              <UserCard user={r} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default UserSearch;
