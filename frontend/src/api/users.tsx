import { API_URL } from "./env-config";

export const retrieveUser = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();
  return data;
};

export const updateUser = async (user: userInterface) => {
  const response = await fetch(`${API_URL}/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  return data;
};

export const searchUser = async (query: string) => {
  const response = await fetch(`${API_URL}/users/search?name=${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();
  return data;
};

export interface userInterface {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  bank: number;
}
