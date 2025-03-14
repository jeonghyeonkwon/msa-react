"use client";

import { certification } from "@/api/auth";
import { getMemos } from "@/api/memo";
import Pagenation from "@/components/Pagenation";
import { IMemoSimple } from "@/interfaces/Memo";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
export default function MemoContainer() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [size, setSize] = useState<number>(1);
  const [post, setPost] = useState<IMemoSimple | null>(null);
  const { data: usersId, isSuccess: authSuccess } = useQuery({
    queryKey: ["usersIds"],
    queryFn: certification,
  });

  const {
    data: pageData,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["memos", currentPage],
    queryFn: () =>
      getMemos({
        usersId: usersId.data,
        currentPage,
        size,
      }),
    enabled: !!authSuccess,
  });

  const onChangePage = useCallback(
    (page: number) => {
      console.log(page);
      setCurrentPage(() => page);
    },
    [currentPage]
  );
  return (
    <>
      {isSuccess && (
        <div className="h-auto scrollbar-hide">
          {pageData.list.map((data: IMemoSimple) => (
            <div className="w-full mb-3 card card-dash bg-base-100">
              <div className="card-body">
                <h2 className="card-title">{data.title}</h2>
                <p>{data.content}</p>
                <div className="justify-end card-actions">
                  <Link
                    href={`/memo/${data.memosId}`}
                    className="btn btn-success"
                  >
                    자세히
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
        </div>
      )}
    </>
  );
}
