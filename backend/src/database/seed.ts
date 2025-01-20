// Models
import User from "./models/users";
import Book from "./models/books";
import Payment from "./models/payments";

// Criando Usuários
export const userSeed = async () => {
  const userList = [
    {
      name: "admin",
      email: "admin@admin.com",
      password: "admin",
      isAdmin: "1",
      bank: 10000,
    },
    { name: "Foo", email: "foo@bar.com", password: "foo123", bank: 100.29 },
    { name: "Bar", email: "bar@blob.com", password: "bar123", bank: 20 },
    { name: "Blob", email: "blob@foo.com", password: "blob123", bank: 12000 },
  ];

  userList.forEach(async (user) => {
    await User.create(user);
  });
};

// Criando Livros
export const bookSeed = async () => {
  const bookList = [
    {
      title: "Journey to Code",
      author: "Alan Devman",
      description: "An inspiring tale of learning programming from scratch.",
      price: 12.99,
      stock: 100,
    },
    {
      title: "Mastering Python",
      author: "Code Whisperer",
      description:
        "A comprehensive guide to Python programming for all levels.",
      price: 25.5,
      stock: 60,
    },
    {
      title: "The Forgotten Algorithms",
      author: "Al Gorithm",
      description: "Rediscovering classic algorithms in modern applications.",
      price: 35.99,
      stock: 30,
    },
    {
      title: "CSS Secrets Revealed",
      author: "Design Guru",
      description: "Master the art of CSS with little-known techniques.",
      price: 18.45,
      stock: 120,
    },
    {
      title: "The Minimalist Coder",
      author: "Sophie CleanCode",
      description: "Embrace simplicity and efficiency in your codebase.",
      price: 10.5,
      stock: 150,
    },
    {
      title: "Databases Demystified",
      author: "Query King",
      description:
        "A beginner-friendly guide to database design and management.",
      price: 29.95,
      stock: 40,
    },
    {
      title: "Async Adventures",
      author: "Promise Fulfilled",
      description: "A journey through asynchronous programming in JavaScript.",
      price: 22.99,
      stock: 70,
    },
    {
      title: "Debugging Masterclass",
      author: "Trace Logger",
      description: "Learn to debug code like a pro.",
      price: 14.25,
      stock: 110,
    },
    {
      title: "Functional Paradigm",
      author: "Lambda Lover",
      description: "Exploring the functional programming world.",
      price: 33.0,
      stock: 50,
    },
    {
      title: "Front-End Wizardry",
      author: "React Enthusiast",
      description: "The magic of creating stunning UIs.",
      price: 19.99,
      stock: 80,
    },
  ];

  bookList.forEach(async (book) => {
    await Book.create(book);
  });
};

const exclude = async () => {
  const excludeBuffer = [
    Payment.truncateTable,
    User.truncateTable,
    Book.truncateTable,
  ];

  // Excluding...
  excludeBuffer.forEach(async (seed) => {
    await seed();
  });
};

const seeder = async () => {
  const seedBuffer = [userSeed, bookSeed];

  // Seeding...
  seedBuffer.forEach(async (seed) => {
    await seed();
  });
};

const excludeAndSeed = async () => {
  await exclude();
  await seeder();
};

export default excludeAndSeed;
