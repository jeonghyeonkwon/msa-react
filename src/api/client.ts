import { RequestMethod } from "./Request";

const APPLICATION_JSON = "application/json";
const AUTHORIZATION = "authorization";
const BEARER = "Bearer ";

export const useApi = () => {
  const fetchData = async (
    endpoint: string,
    method: RequestMethod,
    body?: any
  ) => {
    const headers: any = {
      Content_Type: "application/json",
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
    }

    return response.json();
  };
  return { fetchData };
};
