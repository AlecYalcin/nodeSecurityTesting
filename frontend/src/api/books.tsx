import { API_URL } from "./env-config";

export const searchBooks = async (query: string) => {
  const response = await fetch(`${API_URL}/books/search?title=${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}}`,
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
      Authorization: `Bearer ${localStorage.getItem("token")}}`,
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
