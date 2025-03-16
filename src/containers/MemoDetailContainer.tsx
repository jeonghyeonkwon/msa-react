"use client";
import { certification } from "@/api/auth";
import { getMemo } from "@/api/memo";
import { useQuery } from "@tanstack/react-query";

interface MemoDetailProps {
  memoId: string;
}
export default function MemoDetailContainer({ memoId }: MemoDetailProps) {
  const { data: usersId, isSuccess: authSuccess } = useQuery({
    queryKey: ["usersIds"],
    queryFn: certification,
  });

  const {
    data: memoData,
    isSuccess: memoDetailIsSuccess,
    isError,
  } = useQuery({
    queryKey: ["memo", memoId],
    queryFn: () =>
      getMemo({
        usersId: usersId.data,
        memoId: memoId,
      }),
    enabled: !!authSuccess,
  });

  return (
    <div className="card card-border bg-base-100 ">
      {memoDetailIsSuccess && (
        <div className="card-body">
          <div className="">
            <h1 className="card-title">{memoData.title}</h1>
          </div>
          <div>
            <label>시작일 :</label>
            <b>{memoData.startDate}</b>
          </div>
          <div>
            <label>종료일 :</label>
            <b>{memoData.endDate}</b>
          </div>
          <div>
            <p>{memoData.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
