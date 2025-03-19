"use client";
import { getBoards } from "@/api/board";
import BoardRow from "@/components/BoardRow";
import BoardTable from "@/components/BoardTable";
import Pagenation from "@/components/Pagenation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function BoardListContainer() {
  const [success, setSuccess] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const {
    data: pageData,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["boards", currentPage],
    queryFn: () => getBoards({ currentPage, size }),
  });
  const onChangePage = useCallback(
    (page: number) => {
      console.log(page);
      setCurrentPage(() => page);
    },
    [currentPage]
  );
  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between">
        <div className="m-4 badge badge-soft badge-accent">전체 게시글</div>
        <Link href="/board/create" className="mb-2 mr-3 btn btn-info">
          New.
        </Link>
      </div>
      {isSuccess && (
        <>
          <BoardTable
            isSuccess={success}
            list={pageData.list as ISimpleBoard[]}
          />
          {pageData.list.length === 0 && (
            <div className="w-full mb-3 card card-dash bg-base-100">
              <div className="card-body">
                <h2 className="card-title">메모를 생성해 주세요</h2>
                <p></p>
                <div className="justify-end card-actions"></div>
              </div>
            </div>
          )}
          <Pagenation
            startBlockPage={pageData.startBlockPage}
            endBlockPage={pageData.endBlockPage}
            currentPage={pageData.currentPage}
            isFirst={pageData.isFirst}
            isLast={pageData.isLast}
            onChangePage={onChangePage}
          />
        </>
      )}
    </div>
  );
}
