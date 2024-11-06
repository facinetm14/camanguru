import { API_BASE_ROUTE } from "../env.js";

const register = async (user) => {
  return fetch(`${API_BASE_ROUTE}/users`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  });
};

export const userService = {
  register,
};
