import { IMemo } from "@/interfaces/Memo";
import { useApi } from "./client";
import { MsaService, RequestMethod } from "./Request";

const BASE_ENDPOINT = (usersId: string) => `/api/user/${usersId}/memo`;

const LIST = (
  usersId: string,
  currentPage: number = 0,
  size: number = 10,
  blockSize: number = 5
) =>
  `${BASE_ENDPOINT(
    usersId
  )}?page=${currentPage}&size=${size}&pageBlock=${blockSize}`;

const DETAIL = (usersId: string, memoId: String) =>
  `${BASE_ENDPOINT(usersId)}/${memoId}`;

interface createMemoProps {
  usersId: string;
  dto: IMemo;
}
interface getMemosProps {
  usersId: string;
  currentPage: number;
  size: number;
}
interface getMemoProps {
  usersId: string;
  memoId: string;
}
export const createMemo = async ({
  usersId,
  dto,
}: createMemoProps): Promise<any> => {
  const { fetchData } = useApi();

  return await fetchData(
    BASE_ENDPOINT(usersId),
    RequestMethod.POST,
    MsaService.MEMO,
    dto
  );
};

export const getMemos = async ({
  usersId,
  currentPage,
  size,
}: getMemosProps): Promise<any> => {
  const { fetchData } = useApi();

  return await fetchData(
    LIST(usersId, currentPage, size),
    RequestMethod.GET,
    MsaService.MEMO
  );
};

export const getMemo = async ({
  usersId,
  memoId,
}: getMemoProps): Promise<any> => {
  const { fetchData } = useApi();
  return await fetchData(
    DETAIL(usersId, memoId),
    RequestMethod.GET,
    MsaService.MEMO
  );
};
