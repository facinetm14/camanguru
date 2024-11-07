import { API_BASE_ROUTE } from "../env.js";

const register = async (user) => {
  return fetch(`${API_BASE_ROUTE}/auth/register`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  });
};

const verify = async (token) => {
  return fetch(`${API_BASE_ROUTE}/auth/verify/${token}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
};

export const userService = {
  register,
  verify
};
