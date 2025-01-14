import BookList from "../../components/book-list";

const App = () => {
  return (
    <div className="bg-body-tertiary">
      {/* Main Page */}
      <div>
        <div className="container shadow text-center bg-body p-2 mt-3 mb-5">
          <BookList title="Novos lançamentos!" />
        </div>

        <div className="container shadow text-center bg-body p-2 mt-3 mb-5">
          <BookList title="Melhores preços!" />
        </div>

        <div className="container shadow text-center bg-body p-2 mt-3 mb-5">
          <BookList title="Estão acabando!" />
        </div>
      </div>
    </div>
  );
};

export default App;
