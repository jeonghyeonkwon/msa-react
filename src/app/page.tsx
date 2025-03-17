import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <div className="divider divider-primary">게시글</div>
      <div className="flex w-full">
        <div className="grid h-20 card bg-base-300 rounded-box grow place-items-center">
          인기글 보기
        </div>
        <div className="divider divider-horizontal"></div>
        <Link
          href="/board"
          className="grid h-20 card bg-base-300 rounded-box grow place-items-center"
        >
          게시글 보기
        </Link>
      </div>
      <div className="divider divider-info">메모</div>
      <div className="flex w-full">
        <div className="grid h-20 card bg-base-300 rounded-box grow place-items-center">
          진행중 메모
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="grid h-20 card bg-base-300 rounded-box grow place-items-center">
          마감된 메모
        </div>
      </div>
      <div className="divider divider-secondary">히든</div>
      <div className="flex w-full">
        <div className="grid h-20 card bg-base-300 rounded-box grow place-items-center">
          content
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="grid h-20 card bg-base-300 rounded-box grow place-items-center">
          content
        </div>
      </div>
    </div>
  );
}
