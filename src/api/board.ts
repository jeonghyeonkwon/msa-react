import { useApi } from "./client";
import { MsaService, RequestMethod } from "./Request";

const BASE_ENDPOINT = `/api/boards`;
const CREATE = (usersId: string) => `/api/user/${usersId}/board`;

const LIST = (
  currentPage: number = 0,
  size: number = 10,
  blockSize: number = 5
) => `${BASE_ENDPOINT}?page=${currentPage}&size=${size}&pageBlock=${blockSize}`;

const CREATE_COMMENT = (boardId: string) =>
  `${BASE_ENDPOINT}/${boardId}/comments`;

const COMMENT_LIST = (
  boardId: string,
  currentPage: number = 0,
  size: number = 10,
  blockSize: number = 5
) =>
  `${BASE_ENDPOINT}/${boardId}/comments?page=${currentPage}&size=${size}&pageBlock=${blockSize}`;

interface createBoardProps {
  usersId: string;
  dto: IBoardCreate;
}
interface getBoardProps {
  currentPage: number;
  size: number;
}
export const createBoard = async ({
  usersId,
  dto,
}: createBoardProps): Promise<any> => {
  const { fetchData } = useApi();

  return await fetchData(
    CREATE(usersId),
    RequestMethod.POST,
    MsaService.BOARD,
    dto
  );
};

export const getBoards = async ({
  currentPage,
  size,
}: getBoardProps): Promise<any> => {
  const { fetchData } = useApi();

  return await fetchData(
    LIST(currentPage, size),
    RequestMethod.GET,
    MsaService.BOARD
  );
};

interface getBoardDetailProps {
  boardId: string;
}
export const getBoardDetail = async ({
  boardId,
}: getBoardDetailProps): Promise<any> => {
  const { fetchData } = useApi();
  return await fetchData(
    `${BASE_ENDPOINT}/${boardId}`,
    RequestMethod.GET,
    MsaService.BOARD
  );
};

interface createCommentProps {
  boardId: string;
  dto: {
    usersId: string;
    content: string;
  };
}

interface getCommentsProps {
  boardId: string;
  currentPage: number;
  size: number;
  blockSize?: number;
}
export const getComments = async ({
  boardId,
  currentPage,
  size,
  blockSize,
}: getCommentsProps): Promise<any> => {
  const { fetchData } = useApi();
  return await fetchData(
    COMMENT_LIST(boardId, currentPage, size, blockSize),
    RequestMethod.GET,
    MsaService.BOARD
  );
};

export const createComment = async ({
  boardId,
  dto,
}: createCommentProps): Promise<any> => {
  const { fetchData } = useApi();

  return await fetchData(
    CREATE_COMMENT(boardId),
    RequestMethod.POST,
    MsaService.BOARD,
    dto
  );
};
