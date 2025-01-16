import { useParams } from "react-router-dom";
import UserHistory from "../../components/user-history";
import { useEffect, useState } from "react";
import { paymentsList } from "../../api/payments";

const PageProfileHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await paymentsList(Number(id));
      setHistory(data);
      setLoading(false);
    };

    fetchHistory();
  }, [id]);

  if (loading) return <h1 className="text-center">Carregando... </h1>;

  if (history.length == 0)
    return (
      <h1 className="text-center">
        Não foi possível encontrar um histórico de compras.{" "}
      </h1>
    );

  return (
    <div className="bg-body-tertiary">
      <UserHistory history={history} />
    </div>
  );
};

export default PageProfileHistory;
