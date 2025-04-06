import { authError, authSuccess } from "@/store/store";
import {
  ACCESS_TOKEN,
  getAccessTokenByCookie,
  resetAuthCookie,
  setAuthCookie,
} from "./cookie";
import { RequestMethod, MsaService, HttpStatus } from "./Request";
import { ErrorCode } from "./Response";

const AUTHORIZATION = "authorization";
const BEARER = "Bearer ";
export const LOGIN_URL = "/login";

export const useApi = () => {
  const fetchData = async (
    endpoint: string,
    method: RequestMethod,
    msaService: MsaService,
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
      `${process.env.NEXT_PUBLIC_DEV_URL}${msaService}${endpoint}`,
      options
    );

    if (!response.ok) {
      const errorBody = await response.json();
      console.error(errorBody);

      if (response.status === ErrorCode.Unauthorized) {
        await reissueToken();
        return await fetchData(
          `${process.env.NEXT_PUBLIC_DEV_URL}${msaService}${endpoint}`,
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

    if (
      (response.status === HttpStatus.CREATED &&
        response.headers.get("Content-Length") === "0") ||
      response.status === HttpStatus.NO_CONTENT
    ) {
      return;
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

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_URL}${MsaService.AUTH}/api/auth/reissue`,
    {
      method: RequestMethod.POST,
      headers,
      credentials: "include",
      mode: "cors",
    }
  );

  if (!response.ok) {
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}${MsaService.AUTH}/api/auth/logout`,
      {
        method: RequestMethod.GET,
        headers,
        credentials: "include",
        mode: "cors",
      }
    );

    authError();
    throw new Error("다시 로그인 해주세요");
  }

  authSuccess();
  const accessToken = response.headers.get(ACCESS_TOKEN);
  const { data: usersId } = await response.json();
  setAuthCookie(usersId, accessToken!);
};
