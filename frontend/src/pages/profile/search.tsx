import { useParams } from "react-router-dom";
import UserSearch from "../../components/user-search";

const PageProfileSearch = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="bg-body-tertiary">
      <UserSearch />
    </div>
  );
};

export default PageProfileSearch;
