import { ACCESS_TOKEN, getAccessTokenByCookie, setAuthCookie } from "./cookie";
import { RequestMethod } from "./Request";

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
      throw new Error(errorBody.message);
    }

    if (endpoint === LOGIN_URL) {
      const accessToken = response.headers.get("Access-Token");
      const { data: usersId } = await response.json();
      setAuthCookie(usersId, accessToken!);
      return usersId;
    }

    const responseBody = await response.json();
    return responseBody;
  };
  return { fetchData };
};
