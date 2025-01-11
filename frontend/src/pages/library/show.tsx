import { useParams } from "react-router-dom";
import Book from "../../components/book";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

const PageBookShow = () => {
  const { id } = useParams();

  return (
    <div className="bg-body-tertiary">
      <Navbar />
      <Book id={Number(id)} />
      <Footer />
    </div>
  );
};

export default PageBookShow;
