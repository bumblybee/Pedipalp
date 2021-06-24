import { get, post, destroy } from "./baseApi";

export const getUser = async () => {
  const user = await get("/users/current");
  return user && user.data ? user.data : user;
};

export const signupUser = async (data) => {
  const user = await post("/users/signup", data);
  return user && user.data ? user.data : user;
};

export const loginUser = async (data) => {
  const user = await post("/users/login", data);
  return user && user.data ? user.data : user;
};

export const logoutUser = async () => {
  const logout = await post("/users/logout");
  return logout;
};
