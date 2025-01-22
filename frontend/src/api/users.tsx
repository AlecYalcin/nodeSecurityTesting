import { API_URL } from "./env-config";

export const retrieveUser = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const updateUser = async (user: userInterface) => {
  const response = await fetch(`${API_URL}/users/${user.id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  return data;
};

export const searchUser = async (query: string) => {
  const response = await fetch(`${API_URL}/users/search?name=${query}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
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
