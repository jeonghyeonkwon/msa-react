interface BoardProps {
  data: IBoardDetail;
  liked: boolean;
  onClickLike: (
    e: React.MouseEvent<HTMLButtonElement>,
    boardId: string,
    type: string
  ) => void;
}

export default function Board({ data, onClickLike, liked }: BoardProps) {
  return (
    <div className="card card-border bg-base-100 ">
      <div className="card-body">
        <div className="flex">
          <div className="w-10 mr-2">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
          <div>
            <div className="font-bold">{data.username}</div>
            <div className="flex items-center">
              <div className="mr-5 text-gray-300">{data.createdAt}</div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  width="15"
                  height="15"
                >
                  <path
                    d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68zM16 25c-5.3 0-10.9-3.93-12.93-9C5.1 10.93 10.7 7 16 7s10.9 3.93 12.93 9C26.9 21.07 21.3 25 16 25z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M16 10a6 6 0 1 0 6 6a6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4a4 4 0 0 1-4 4z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span className="ml-1">{String(data.viewCount)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-lg font-black">{data.title}</div>

        <div>
          <p>{data.content}</p>
        </div>
      </div>
      <div className="p-2">
        <button
          className="btn btn-square"
          onClick={
            liked
              ? (e) => onClickLike(e, data.boardId, "DELETE")
              : (e) => onClickLike(e, data.boardId, "INSERT")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            // stroke="#e53fe5"

            stroke={liked ? "#e53fe5" : "currentColor"}
            className="size-[1.2em]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
