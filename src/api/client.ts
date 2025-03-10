import { RequestMethod } from "./Request";

const AUTHORIZATION = "authorization";
const BEARER = "Bearer ";

export const useApi = () => {
  const fetchData = async (
    endpoint: string,
    method: RequestMethod,
    body?: any
  ) => {
    const headers: any = {
      "Content-Type": "application/json",
    };

    headers[AUTHORIZATION] = `${BEARER}`;

    const options: RequestInit = {
      method,
      headers,
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
    const responseBody = await response.json();
    return responseBody;
  };
  return { fetchData };
};
