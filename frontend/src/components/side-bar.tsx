import { FaHome, FaUser, FaUsers, FaMoneyBill } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import Logo from "../assets/icon.png";

const SideBar = () => {
  return (
    <div>
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title" id="offCanvasLabel">
          <span>
            <img
              src={Logo}
              alt="logo"
              height="40"
              width="40"
              className="me-2"
            />
            Livraria Digital
          </span>
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body min-vh-100 bg-secondary bg-opacity-75">
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="mb-2">
            <a
              href="/"
              className="nav-link border border-primary text-primary bg-white"
            >
              <svg className="bi me-2" width="16" height="16">
                <FaHome />
              </svg>
              Página Inicial
            </a>
          </li>
          <li className="mb-2">
            <a
              href="/profile"
              className="nav-link border border-primary text-primary bg-white"
            >
              <svg className="bi me-2" width="16" height="16">
                <FaUser />
              </svg>
              Perfil de Usuário
            </a>
          </li>
          <li className="mb-2">
            <a
              href="/payment/search"
              className="nav-link border border-primary text-primary bg-white"
            >
              <svg className="bi me-2" width="16" height="16">
                <FaMoneyBill />
              </svg>
              Pagamentos
            </a>
          </li>
          <li className="mb-2">
            <a
              href="/profile/search"
              className="nav-link border border-primary text-primary bg-white"
            >
              <svg className="bi me-2" width="16" height="16">
                <FaUsers />
              </svg>
              Usuários
            </a>
          </li>
          <li className="mb-2">
            <a
              href="/book/create"
              className="nav-link border border-primary text-primary bg-white"
            >
              <svg className="bi me-2" width="16" height="16">
                <GiBookshelf />
              </svg>
              Livros
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
