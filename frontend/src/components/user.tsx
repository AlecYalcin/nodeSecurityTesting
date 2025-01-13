const User = ({ edit = false }: { edit: boolean }) => {
  return (
    <div>
      <form className="container">
        <div className="">
          <label className="form-label fs-2" htmlFor="title">
            Nome
          </label>
          <input id="name" className="form-control" disabled={!edit} />
        </div>
        <div className="">
          <label className="form-label fs-2" htmlFor="title">
            Email
          </label>
          <input id="email" className="form-control" disabled={!edit} />
        </div>
        <div className="">
          <label className="form-label fs-2" htmlFor="title">
            Conta Bancária
          </label>
          <input id="bank" className="form-control" disabled={!edit} />
        </div>

        {edit ? (
          <div className="mt-3">
            <button className="btn btn-md btn-outline-primary">
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
