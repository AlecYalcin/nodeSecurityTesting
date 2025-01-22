const UserCard = ({
  user,
}: {
  user: {
    id: number;
    name: string;
    email: string;
  };
}) => {
  return (
    <div className="container-fluid">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-2 text-center p-5">
            <span className="fs-2">{user.id}</span>
          </div>
          <div className="col-md">
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
