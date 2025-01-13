import { useParams } from "react-router-dom";
import Book from "../../components/book";

const PageBookCreate = () => {
  const { id } = useParams();

  return (
    <div className="bg-body-tertiary">
      <Book id={Number(id)} edit={true} create={true} />]
    </div>
  );
};

export default PageBookCreate;
