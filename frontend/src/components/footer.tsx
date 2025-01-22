import BookIcon from "../../public/icon.png";

const Footer = () => {
  return (
    <div className="container-fluid border-top mt-5">
      <footer className="container d-flex flex-wrap justify-content-between align-items-center py-3 my-4">
        <p className="text-muted">© 2025 Alec Can Yalcin</p>
        <img src={BookIcon} alt="..." height="32" width="40" />
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <a className="nav-link text-muted" href="#">
              Início
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-muted" href="#">
              Sobre
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-muted" href="#">
              Perfil
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
