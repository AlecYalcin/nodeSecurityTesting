import { API_URL, getStorage } from "./env-config";

export const searchBooks = async (query: string) => {
  const response = await fetch(`${API_URL}/books/search?title=${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const listBooks = async ({
  recent = false,
  price = false,
  stock = false,
}: {
  recent: boolean;
  price: boolean;
  stock: boolean;
}) => {
  let query = "";

  if (recent) query += "recent=true&";
  if (price) query += "lower=100&";
  if (stock) query += "stock=20&";

  const response = await fetch(`${API_URL}/books/search?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const retrieveBook = async (id: number) => {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const updateBook = async (book: {
  id: number;
  title: string;
  author: string;
  price: number;
  stock: number;
}) => {
  const response = await fetch(`${API_URL}/books/${book.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(book),
  });

  const data = await response.json();
  return data;
};

export const createBook = async (book: {
  id: number;
  title: string;
  author: string;
  price: number;
  stock: number;
}) => {
  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(book),
  });

  const data = await response.json();
  return data;
};

export const buyBook = async (book_id: number, quantity: number) => {
  const { token, id } = getStorage();

  const response = await fetch(`${API_URL}/payments/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id: id,
      book_id: book_id,
      quantity: quantity,
    }),
  });

  const data = await response.json();
  return data;
};

export interface bookInterface {
  id: number;
  title: string;
  author: string;
  price: number;
  stock: number;
}
