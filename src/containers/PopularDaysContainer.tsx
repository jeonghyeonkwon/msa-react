"use client";
import { getPopularDays } from "@/api/popular-posts";
import { useQuery } from "@tanstack/react-query";

export default function PopularDaysContainer() {
  const { data, isSuccess } = useQuery({
    queryKey: ["popularDays"],
    queryFn: getPopularDays,
  });
  return (
    <>
      <div className="mb-4">
        <div className="badge badge-soft badge-primary badge-xl">인기글</div>
      </div>
      <div className="">
        {isSuccess &&
          data!.data.map((day: any) => (
            <div className="badge badge-soft badge-info">{day.message}</div>
          ))}
      </div>
    </>
  );
}
