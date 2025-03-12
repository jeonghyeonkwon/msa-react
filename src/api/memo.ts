import { IMemo } from "@/interfaces/Memo";
import { useApi } from "./client";
import { RequestMethod } from "./Request";

const BASE_ENDPOINT = (usersId: string) => `/api/${usersId}/memo`;
interface createMemoProps {
  usersId: string;
  dto: IMemo;
}
export const createMemo = async ({
  usersId,
  dto,
}: createMemoProps): Promise<any> => {
  const { fetchData } = useApi();

  return await fetchData(BASE_ENDPOINT(usersId), RequestMethod.POST, dto);
};
