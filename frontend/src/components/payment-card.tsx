const PaymentCard = ({
  payment,
}: {
  payment: {
    id: number;
    user_id: number;
    book_id: number;
    total_price: number;
    quantity: number;
  };
}) => {
  return (
    <div className="container-fluid px-3">
      <a href={`/payment/${payment.id}`} className="text-decoration-none">
        <div className="card">
          <div className="card-header">Pagamento #{payment.id}</div>
          <div className="card-body">
            <h5 className="card-title">
              {payment.quantity}x de {payment.book_id} = R${payment.total_price}
            </h5>
          </div>
        </div>
      </a>
    </div>
  );
};

export default PaymentCard;
