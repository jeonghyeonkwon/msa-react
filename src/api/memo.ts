import { IMemo } from "@/interfaces/Memo";
import { useApi } from "./client";
import { RequestMethod } from "./Request";

const BASE_ENDPOINT = (usersId: string) => `/api/${usersId}/memo`;

const LIST = (
  usersId: string,
  currentPage: number = 0,
  size: number = 10,
  blockSize: number = 5
) =>
  `${BASE_ENDPOINT(
    usersId
  )}?page=${currentPage}&size=${size}&pageBlock=${blockSize}`;

interface createMemoProps {
  usersId: string;
  dto: IMemo;
}
interface getMemosProps {
  usersId: string;
  currentPage: number;
  size: number;
}
export const createMemo = async ({
  usersId,
  dto,
}: createMemoProps): Promise<any> => {
  const { fetchData } = useApi();

  return await fetchData(BASE_ENDPOINT(usersId), RequestMethod.POST, dto);
};

export const getMemos = async ({
  usersId,
  currentPage,
  size,
}: getMemosProps): Promise<any> => {
  const { fetchData } = useApi();

  return await fetchData(LIST(usersId, currentPage, size), RequestMethod.GET);
};
