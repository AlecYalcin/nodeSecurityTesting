import { useParams } from "react-router-dom";
import Footer from "../../components/footer";
import UserSearch from "../../components/user-search";
import Navbar from "../../components/navbar";

const PageProfileSearch = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="bg-body-tertiary">
      <Navbar />
      <UserSearch />
      <Footer />
    </div>
  );
};

export default PageProfileSearch;
