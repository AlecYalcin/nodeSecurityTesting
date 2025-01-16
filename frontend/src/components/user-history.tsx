import { paymentInterface } from "../api/payments";
import PaymentCard from "./payment-card";

const UserHistory = ({ history }: { history: paymentInterface[] }) => {
  return (
    <div className="container p-2">
      <div className="container-fluid">
        {history.map((payment, index) => {
          return (
            <div className="mb-2" key={index}>
              <PaymentCard payment={payment} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserHistory;
