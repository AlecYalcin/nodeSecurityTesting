import { useParams } from "react-router-dom";
import User from "../../components/user";

const PageProfileEdit = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="bg-body-tertiary">
      <User edit={true} />
    </div>
  );
};

export default PageProfileEdit;
