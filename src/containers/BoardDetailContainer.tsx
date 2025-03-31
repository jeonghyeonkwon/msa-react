import { certification } from "@/api/auth";
import { commandLike, getBoardDetail } from "@/api/board";
import Board from "@/components/Board";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CommentListContainer from "./CommentListContainer";

interface BoardDetailProps {
  boardId: string;
}
export default function BoardDetailContainer({ boardId }: BoardDetailProps) {
  const {
    data: boardData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["board", boardId],
    queryFn: () => getBoardDetail({ boardId }),
  });
  const { data: usersId, isSuccess: authSuccess } = useQuery({
    queryKey: ["usersIds"],
    queryFn: certification,
    retry: 1,
  });

  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      setLiked((prev) => boardData.liked);
    }
  }, [boardData]);

  const likeMutation = useMutation({
    mutationFn: commandLike,
    onSuccess: (data) => {
      setLiked((prev) => !prev);
    },
    onError: (error) => {
      console.error("에러");
    },
  });

  const onClickLike = (
    e: React.MouseEvent<HTMLButtonElement>,
    boardId: string,
    type: string
  ) => {
    e.preventDefault();
    likeMutation.mutate({
      usersId: usersId.data,
      boardId: boardId,
      type,
    });
  };
  return (
    <>
      {isSuccess && (
        <Board
          data={boardData as IBoardDetail}
          onClickLike={onClickLike}
          liked={liked}
        />
      )}

      <div className="flex flex-col w-full">
        <div className="divider divider-start divider-info">댓글</div>
      </div>
      <CommentListContainer
        usersId={usersId && usersId.data}
        boardId={boardId}
      />
    </>
  );
}
