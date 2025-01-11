import RegisterImg from "../../../public/register-img.jpg";

const Register = () => {
  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img
              src={RegisterImg}
              alt="Login image"
              className="w-100 vh-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </div>
          <div className="col-sm-6 text-black">
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form className="container-fluid">
                <h3
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Criação de Conta
                </h3>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="name"
                    id="name"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="name">
                    Nome de Usuário
                  </label>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                </div>

                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                  />
                  <label className="form-label" htmlFor="password">
                    Senha
                  </label>
                </div>

                <div className="pt-1 mb-4">
                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-info btn-lg btn-block"
                    type="button"
                  >
                    Criar Conta
                  </button>
                </div>

                <p>
                  Já possui uma conta?{" "}
                  <a href="/login" className="link-info">
                    Entre por aqui
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
