import { useParams } from "react-router-dom";
import Footer from "../../components/footer";
import User from "../../components/user";
import Navbar from "../../components/navbar";

const PageProfileEdit = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="bg-body-tertiary">
      <Navbar />
      <User edit={true} />
      <Footer />
    </div>
  );
};

export default PageProfileEdit;
