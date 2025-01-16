import { paymentInterface } from "../api/payments";

const PaymentCard = ({ payment }: { payment: paymentInterface }) => {
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
