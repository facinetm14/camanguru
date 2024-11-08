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

<<<<<<< HEAD
const login = async (username, passwd) => {
  return fetch(`${API_BASE_ROUTE}/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({username, passwd}),
  });
}

=======
>>>>>>> bd3ae3c (13 user authentication (#14))
export const userService = {
  register,
  verify
};
