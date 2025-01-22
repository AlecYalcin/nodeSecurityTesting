import { FormEvent, useEffect, useState } from "react";
import SideBar from "./side-bar";
import { useNavigate } from "react-router-dom";
import { getStorage } from "../api/env-config";
import { retrieveUser } from "../api/users";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState({ id: 0, name: "", bank: 0 });
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/book/search?query=${encodeURIComponent(searchQuery)}`, {
        replace: true,
      });
    }
  };

  // Pegando Token e Id
  const { token, id } = getStorage();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await retrieveUser(Number(id));

        if (data.error) return;

        setUser({
          id: data.id,
          name: data.name,
          bank: data.bank,
        });

        if (data.isAdmin) setIsAdmin(true);
      } catch (error) {
        alert(error);
      }
    };

    if (Number(user.id) !== 0) fetchUser();
  }, [token, id, user.id]);

  return (
    <div>
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex={-1}
        id="offCanvas"
        aria-labelledby="offCanvasLabel"
      >
        <SideBar id={user.id} admin={isAdmin} />
      </div>

      <nav className="navbar bg-secondary-subtle">
        <div className="container-fluid">
          {/* Side Menu Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offCanvas"
            aria-controls="offCanvas"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Search Book Bar */}
          <form
            className="d-flex justify-content-between"
            onSubmit={handleSearch}
          >
            <input
              className="form-control col-4 me-2"
              type="search"
              placeholder="Pesquise por Algum Livro!"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Procure
            </button>
          </form>

          {/* Profile/Auth Bar */}
          {user.id === 0 ? (
            <div className="d-flex justify-content-between">
              <a className="btn btn-primary me-2" href="/login">
                Login
              </a>
              <a className="btn btn-outline-primary" href="/register">
                Registro
              </a>
            </div>
          ) : (
            <div className="d-flex justify-content-between">
              <span className="mt-1 fs-5">Usuário: {user.name}</span>
              <span className="border-end border-primary mx-2"></span>
              <span className="me-1 fs-5 text-success">
                Banco: R${user.bank}
              </span>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
