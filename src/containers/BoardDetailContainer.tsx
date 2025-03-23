import { certification } from "@/api/auth";
import { createComment, getBoardDetail, getComments } from "@/api/board";
import Board from "@/components/Board";
import Pagenation from "@/components/Pagenation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

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

  const [comment, setComment] = useState("");

  const [comments, setComments] = useState<IComment[]>([]);
  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      setComment("");
      setComments((prev) => {
        const successData = { ...data, isOpenForm: false };
        return [successData, ...prev];
      });
    },
  });
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setComment(value);
    },
    [comment]
  );
  const onClickCreateComment = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      mutation.mutate({
        boardId,
        dto: { usersId: usersId.data, content: comment },
      });
    },
    [comment]
  );

  // 댓글

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const {
    data: commentPage,
    isSuccess: fetchCommentSuccess,
    isError: fetchCommentError,
  } = useQuery({
    queryKey: ["comments", boardId, currentPage],
    queryFn: () =>
      getComments({ boardId: boardId, currentPage: currentPage, size: size }),
    enabled: !!boardId,
  });

  useEffect(() => {
    if (fetchCommentSuccess) {
      setComments((prev) => [
        ...commentPage.list.map((comment: IComment) => ({
          commentId: comment.commentId,
          content: comment.content,
          createdDate: comment.createdDate,
          username: comment.username,
          usersId: comment.usersId,
          isOpenForm: false,
        })),
      ]);
    }
  }, [commentPage]);
  const onChangePage = useCallback(
    (page: number) => {
      console.log(page);
      setCurrentPage(() => page);
    },
    [currentPage]
  );
  const onClickToggleForm = useCallback(
    (commentId: string) => {
      console.log("click", commentId);
      console.log(comments);
      setComments((prev) =>
        prev.map((comment: IComment) =>
          comment.commentId === commentId
            ? { ...comment, isOpenForm: !comment.isOpenForm }
            : comment
        )
      );
    },
    [comments]
  );
  return (
    <>
      {isSuccess && <Board data={boardData as IBoardDetail} />}

      <div className="flex flex-col w-full">
        <div className="divider divider-start divider-info">댓글</div>
      </div>
      <div className="flex p-1 mb-3">
        <textarea
          placeholder="댓글 내용을 입력하세요."
          className="mr-2 textarea textarea-primary"
          name="comment"
          value={comment}
          onChange={(e) => handleChange(e)}
        ></textarea>
        <button className="btn btn-primary " onClick={onClickCreateComment}>
          댓글 달기
        </button>
      </div>
      {/* 댓글 리스트 시작 */}

      {fetchCommentSuccess && (
        <>
          {comments.map((commentDto: IComment) => (
            <div className="mb-4">
              <div className="chat chat-start ">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {commentDto.username}
                  <time className="text-xs opacity-50">
                    {commentDto.createdDate}
                  </time>
                </div>
                <div className="flex items-end">
                  <div className="mr-3 chat-bubble">{commentDto.content}</div>
                  <div onClick={() => onClickToggleForm(commentDto.commentId)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      height="15"
                      width="15"
                    >
                      <path
                        d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4c32.7 12.3 69 19.4 107.4 19.4c141.4 0 256-93.1 256-208S397.4 32 256 32z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div className="opacity-50 chat-footer">
                  {/* {String(commentDto.isOpenForm)} */}
                </div>
              </div>
              <div
                className={`flex mt-2 pl-9 overflow-hidden transition-all duration-500 ease-in-out ${
                  commentDto.isOpenForm ? "h-full opacity-100" : "opacity-0 h-0"
                }`}
              >
                <textarea
                  placeholder="댓글 내용을 입력하세요."
                  className="mr-2 textarea textarea-info"
                ></textarea>
                <button className="btn btn-info btn-sm">답글 달기</button>
              </div>
            </div>
          ))}
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              Anakin
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="opacity-50 chat-footer">Seen at 12:46</div>
          </div>
          <Pagenation
            isFirst={commentPage.isFirst}
            isLast={commentPage.isLast}
            startBlockPage={commentPage.startBlockPage}
            endBlockPage={commentPage.endBlockPage}
            currentPage={commentPage.currentPage}
            onChangePage={onChangePage}
          />
        </>
      )}
    </>
  );
}
