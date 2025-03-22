import Link from "next/link";
interface BoardRowProps {
  boardData: ISimpleBoard;
}
export default function BoardRow({ boardData }: BoardRowProps) {
  return (
    <Link href={`/board/${boardData.boardId}`}>
      <div className="flex flex-col items-center justify-between w-full p-3 h-25">
        <div className="flex items-center justify-between w-full h-60">
          <div className="flex">
            <div className="mr-4">
              <span className="font-normal ">{boardData.username}</span>
            </div>
            <div className="font-thin text-gray-300">{boardData.createdAt}</div>
          </div>
          <div className="flex items-center w-20">
            <svg viewBox="0 0 16 16" height="15" width="15">
              <g fill="none">
                <path
                  d="M1 4.5A2.5 2.5 0 0 1 3.5 2h9A2.5 2.5 0 0 1 15 4.5v5a2.5 2.5 0 0 1-2.5 2.5H8.688l-3.063 2.68A.98.98 0 0 1 4 13.942V12h-.5A2.5 2.5 0 0 1 1 9.5v-5zM3.5 3A1.5 1.5 0 0 0 2 4.5v5A1.5 1.5 0 0 0 3.5 11H5v2.898L8.312 11H12.5A1.5 1.5 0 0 0 14 9.5v-5A1.5 1.5 0 0 0 12.5 3h-9z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
            <span className="ml-1">
              {boardData.commentCount ? String(boardData.commentCount) : "0"}
            </span>
          </div>
        </div>
        <div className="w-full overflow-hidden font-black h-39 whitespace-nowrap text-ellipsis">
          {boardData.title}
        </div>
        <div className="w-full h-1 mt-3 bg-gray-500 rounded-xl"></div>
      </div>
    </Link>
  );
}
