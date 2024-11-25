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


const signIn = async (username, passwd) => {
  return fetch(`${API_BASE_ROUTE}/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({username, passwd}),
  });
}


const isAuth = async () => {

}

const getUserInfos = async (userId) => {};

export const userService = {
  register,
  verify,
  signIn,
  getUserInfos,
  isAuth
};
