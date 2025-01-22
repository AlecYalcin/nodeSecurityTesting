import Cookies from "js-cookie";

export const API_URL = "http://localhost:3000";

export const setStorage = (id: string) => {
  localStorage.setItem("id", id);
};

export const getStorage = () => {
  const token = Cookies.get("token");
  const id = localStorage.getItem("id");

  return { token, id };
};

export interface messageReturn {
  message: string;
  error?: boolean;
}
