interface BoardProps {
  data: IBoardDetail;
}

export default function Board({ data }: BoardProps) {
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
                <span>{String(data.viewCount)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-lg font-black">{data.title}</div>

        <div>
          <p>{data.content}</p>
        </div>
      </div>
    </div>
  );
}
