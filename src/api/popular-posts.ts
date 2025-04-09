import { useApi } from "./client";
import { MsaService, RequestMethod } from "./Request";

const BASE_ENDPOINT = `/api/popular-posts`;

const DAYS = `${BASE_ENDPOINT}/days`;

const LIST = (day: string) => `${BASE_ENDPOINT}?d=${day}`;

export const getPopularDays = async (): Promise<any> => {
  const { fetchData } = useApi();

  return await fetchData(DAYS, RequestMethod.GET, MsaService.POPULAR);
};

interface getPopularPostsProps {
  day: string;
}
export const getPopularPosts = async ({ day }: getPopularPostsProps) => {
  const { fetchData } = useApi();

  return await fetchData(LIST(day), RequestMethod.GET, MsaService.POPULAR);
};
