import {
  ACCESS_TOKEN,
  getAccessTokenByCookie,
  resetAuthCookie,
  setAuthCookie,
} from "./cookie";
import { RequestMethod } from "./Request";
import { ErrorCode } from "./Response";

const AUTHORIZATION = "authorization";
const BEARER = "Bearer ";
export const LOGIN_URL = "/login";

export const useApi = () => {
  const fetchData = async (
    endpoint: string,
    method: RequestMethod,
    body?: any
  ) => {
    const headers: any = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (getAccessTokenByCookie()) {
      const accessToken = getAccessTokenByCookie();
      headers[AUTHORIZATION] = `${BEARER}${accessToken}`;
    }

    const options: RequestInit = {
      method,
      headers,
      credentials: "include",
      mode: "cors",
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}${endpoint}`,
      options
    );

    if (!response.ok) {
      const errorBody = await response.json();
      console.error(errorBody);

      if (response.status === ErrorCode.Unauthorized) {
        await reissueToken();
        return await fetchData(
          `${process.env.NEXT_PUBLIC_DEV_URL}${endpoint}`,
          method,
          body
        );
      }

      throw new Error(errorBody.message);
    }

    if (endpoint === LOGIN_URL) {
      const accessToken = response.headers.get(ACCESS_TOKEN);
      const { data: usersId } = await response.json();
      setAuthCookie(usersId, accessToken!);
      return usersId;
    }

    const responseBody = await response.json();
    return responseBody;
  };
  return { fetchData };
};
const reissueToken = async () => {
  const headers: any = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const options: RequestInit = {
    method: RequestMethod.POST,
    headers,
    credentials: "include",
    mode: "cors",
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_URL}/api/auth/reissue`,
    options
  );

  if (!response.ok) {
    resetAuthCookie();
    throw new Error("다시 로그인 해주세요");
  }

  const accessToken = response.headers.get(ACCESS_TOKEN);
  const { data: usersId } = await response.json();
  setAuthCookie(usersId, accessToken!);
};
