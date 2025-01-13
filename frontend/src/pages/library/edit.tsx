import { useParams } from "react-router-dom";
import Book from "../../components/book";

const PageBookEdit = () => {
  const { id } = useParams();

  return (
    <div className="bg-body-tertiary">
      <Book id={Number(id)} edit={true} create={false} />
    </div>
  );
};

export default PageBookEdit;
