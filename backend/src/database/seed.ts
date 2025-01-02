import { sequelize } from "./config/database";

// Models
import User from "./models/users";
import Book from "./models/books";

// Criando Usuários
export const userSeed = async () => {
  const userList = [
    { name: "Foo", email: "foo@bar.com", password: "foo123", bank: "100.29" },
    { name: "Bar", email: "bar@blob.com", password: "bar123", bank: "20" },
    { name: "Blob", email: "blob@foo.com", password: "blob123", bank: "12000" },
  ];

  userList.forEach(async (user) => {
    await User.create(user);
  });
};

// Criando Livros
export const bookSeed = async () => {
  const bookList = [
    {
      title: "The Art of Test I",
      author: "The Tester",
      description: "A testing book about testing things",
      price: 9.75,
      stock: 200,
    },
    {
      title: "The Art of Test II",
      author: "The Tester",
      description: "A testing book about testing things, second volume.",
      price: 15.99,
      stock: 15,
    },
    {
      title: "The Art of Test III",
      author: "The Tester & Beta Tester",
      description: "A testing book about testing things, third volume",
      price: 56.78,
      stock: 80,
    },
  ];

  bookList.forEach(async (book) => {
    await Book.create(book);
  });
};

const seeder = async () => {
  const buffer = [userSeed, bookSeed];

  buffer.forEach(async (seed) => {
    await seed();
  });
};

export default seeder;
