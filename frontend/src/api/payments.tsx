import { API_URL } from "./env-config";

export const paymentsList = async (
  user_id: number | null = null,
  id: number | null = null
) => {
  let querySearch = `${API_URL}/payments/list`;

  if (user_id !== null) {
    querySearch += `?user_id=${user_id}&`;
  }

  if (id !== null) {
    querySearch += `?id=${id}&`;
  }

  const response = await fetch(querySearch, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();
  return data;
};

export const paymentTransfer = async (
  user_id: number,
  target_id: number,
  total: number
) => {
  const response = await fetch(`${API_URL}/payments/transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ user_id, target_id, total }),
  });

  const data = await response.json();
  return data;
};

export interface paymentInterface {
  id: number;
  user_id: number;
  book_id: number;
  total_price: number;
  quantity: number;
}
