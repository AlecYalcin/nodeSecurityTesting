import { useParams } from "react-router-dom";
import Book from "../../components/book";

const PageBookShow = () => {
  const { id } = useParams();

  return (
    <div className="bg-body-tertiary">
      <Book id={Number(id)} edit={false} create={false} />
    </div>
  );
};

export default PageBookShow;
