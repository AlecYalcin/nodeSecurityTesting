import { FormEvent, useState } from "react";
import SideBar from "./side-bar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/book/search?query=${encodeURIComponent(searchQuery)}`, {
        replace: true,
      });
    }
  };

  const isAuthenticated = true;

  return (
    <div>
      <div
        className="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex={-1}
        id="offCanvas"
        aria-labelledby="offCanvasLabel"
      >
        <SideBar />
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
          {!isAuthenticated ? (
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
              <span className="me-1 fs-5 text-success">R$ 100</span>
              <span className="border-end border-primary mx-2"></span>
              <span className="mt-1 fs-6">Teste 01</span>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
