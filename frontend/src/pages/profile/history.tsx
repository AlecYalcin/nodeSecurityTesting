import { useParams } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import UserHistory from "../../components/user-history";

const PageProfileHistory = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="bg-body-tertiary">
      <Navbar />
      <UserHistory />
      <Footer />
    </div>
  );
};

export default PageProfileHistory;
