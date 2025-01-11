const Navbar = () => {
  return (
    <div>
      <nav className="navbar bg-secondary-subtle">
        <div className="container-fluid">
          {/* Side Menu Button */}
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon" />
          </button>

          {/* Search Book Bar */}
          <form className="d-flex justify-content-between">
            <input
              className="form-control col-4 me-2"
              type="search"
              placeholder="Pesquise por Algum Livro!"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Procure
            </button>
          </form>

          {/* Profile/Auth Bar */}
          <div className="d-flex justify-content-between">
            <a className="btn btn-primary me-2" href="/login">
              Login
            </a>
            <a className="btn btn-outline-primary" href="/register">
              Registro
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
