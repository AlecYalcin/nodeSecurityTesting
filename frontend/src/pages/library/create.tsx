import Book from "../../components/book";

const PageBookCreate = () => {
  return (
    <div className="bg-body-tertiary">
      <Book book={null} edit={true} create={true} admin={false} />
    </div>
  );
};

export default PageBookCreate;
