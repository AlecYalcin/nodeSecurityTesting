import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import LoginImg from "../../assets/login-img.jpg";

const PageLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Realizando o Login com a Api
      const data = await login(email, password);

      // Verificando se a conexão obteve sucesso
      if (data.id) {
        // Adicionando Token ao Localstorage
        localStorage.setItem("id", data.id);

        // Redirecionar o Usuário Autenticado
        navigate("/");

        return;
      }

      alert("Usuário não encontrado.");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form className="container-fluid" onSubmit={handleLogin}>
                <h3
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Autenticação
                </h3>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="email"
                    id="form2Example18"
                    className="form-control form-control-lg"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form2Example18">
                    Email
                  </label>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example28"
                    className="form-control form-control-lg"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form2Example28">
                    Senha
                  </label>
                </div>

                <div className="pt-1 mb-4">
                  <button
                    className="btn btn-info btn-lg btn-block"
                    type="submit"
                  >
                    Realizar Autenticação
                  </button>
                </div>

                <p>
                  Não tem uma conta?{" "}
                  <a href="/register" className="link-info">
                    Se register aqui
                  </a>
                </p>
              </form>
            </div>
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img
              src={LoginImg}
              alt="Login image"
              className="w-100 vh-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageLogin;
