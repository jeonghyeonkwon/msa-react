import { useApi } from "./client";
import { MsaService, RequestMethod } from "./Request";

const BASE_ENDPOINT = (usersId: string) => `/api/user/${usersId}/board`;

interface createBoardProps {
  usersId: string;
  dto: IBoardCreate;
}
export const createBoard = async ({
  usersId,
  dto,
}: createBoardProps): Promise<any> => {
  const { fetchData } = useApi();

  return await fetchData(
    BASE_ENDPOINT(usersId),
    RequestMethod.POST,
    MsaService.BOARD,
    dto
  );
};
