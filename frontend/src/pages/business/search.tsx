import { useParams } from "react-router-dom";
import PaymentSearch from "../../components/payment-search";

const PagePaymentSearch = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="bg-body-tertiary">
      <PaymentSearch />
    </div>
  );
};

export default PagePaymentSearch;
