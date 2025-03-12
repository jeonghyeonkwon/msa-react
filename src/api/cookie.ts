import { getCookie, setCookie, deleteCookie } from "cookies-next";

const USERS_ID_KEY = "msa-users-id";
export const ACCESS_TOKEN = "access-token";

export const setAuthCookie = (usersId: number, accessToken: string) => {
  resetAuthCookie();
  setCookie(ACCESS_TOKEN, accessToken);
  setCookie(USERS_ID_KEY, usersId);
};
export const getUsersIdByCookie = () => {
  return getCookie(USERS_ID_KEY);
};

export const getAccessTokenByCookie = () => {
  return getCookie(ACCESS_TOKEN);
};

export const resetAuthCookie = () => {
  deleteCookie(ACCESS_TOKEN);

  deleteCookie(USERS_ID_KEY);
};
