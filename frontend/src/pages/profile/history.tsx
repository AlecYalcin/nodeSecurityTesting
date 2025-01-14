import { useParams } from "react-router-dom";
import UserHistory from "../../components/user-history";

const PageProfileHistory = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="bg-body-tertiary">
      <UserHistory />
    </div>
  );
};

export default PageProfileHistory;
