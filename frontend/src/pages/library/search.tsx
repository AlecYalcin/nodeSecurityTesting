import { useParams } from "react-router-dom";
import BookSearch from "../../components/book-search";

const PageLibrarySearch = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="bg-body-tertiary">
      <BookSearch />
    </div>
  );
};

export default PageLibrarySearch;
