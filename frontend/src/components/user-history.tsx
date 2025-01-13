import PaymentCard from "./payment-card";

const UserHistory = () => {
  const history = [
    { id: 1, user_id: 1, book_id: 1, total_price: 100, quantity: 20 },
    { id: 2, user_id: 1, book_id: 2, total_price: 298, quantity: 78 },
    { id: 3, user_id: 1, book_id: 3, total_price: 34, quantity: 2 },
  ];

  return (
    <div className="container p-2">
      <div className="container-fluid">
        {history.map((payment) => {
          return (
            <div className="mb-2">
              <PaymentCard payment={payment} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserHistory;
