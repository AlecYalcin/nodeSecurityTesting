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
