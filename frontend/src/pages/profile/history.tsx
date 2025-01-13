import { useParams } from "react-router-dom";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

const PageProfileHistory = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="bg-body-tertiary">
      <Navbar />
      <Footer />
    </div>
  );
};

export default PageProfileHistory;
