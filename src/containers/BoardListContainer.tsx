"use client";
import BoardRow from "@/components/BoardRow";
import BoardTable from "@/components/BoardTable";
import Link from "next/link";
import { useState } from "react";

export default function BoardListContainer() {
  const [success, setSuccess] = useState<boolean>(true);
  const [list, setList] = useState<ISimpleBoard[]>([
    {
      boardId: "21470000000",
      title: "제목1",
      username: "givejeong1",
      createDate: "2025-01-04",
      commentCount: 1,
    },
    {
      boardId: "21470000000",
      title: "제목1",
      username: "givejeong1",
      createDate: "2025-01-04",
      commentCount: 1,
    },
    {
      boardId: "21470000000",
      title: "제목1",
      username: "givejeong1",
      createDate: "2025-01-04",
      commentCount: 1,
    },
    {
      boardId: "21470000000",
      title: "제목1",
      username: "givejeong1",
      createDate: "2025-01-04",
      commentCount: 155,
    },
  ]);
  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="m-4 badge badge-soft badge-accent">전체 게시글</div>
        <Link href="/board/create" className="mb-2 mr-3 btn btn-info">
          New.
        </Link>
      </div>
      <BoardTable isSuccess={success} list={list} />
    </div>
  );
}
