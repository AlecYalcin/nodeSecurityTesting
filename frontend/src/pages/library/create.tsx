import { useParams } from "react-router-dom";
import Book from "../../components/book";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

const PageBookCreate = () => {
  const { id } = useParams();

  return (
    <div className="bg-body-tertiary">
      <Navbar />
      <Book id={Number(id)} edit={true} create={true} />
      <Footer />
    </div>
  );
};

export default PageBookCreate;
