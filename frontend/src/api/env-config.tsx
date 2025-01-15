export const API_URL = "http://localhost:3000";

export const setStorage = (token: string, id: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("id", id);
};

export const getStorage = () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  return { token, id };
};
