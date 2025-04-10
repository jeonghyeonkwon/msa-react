"use client";
import { getPopularDays } from "@/api/popular-posts";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface PopularDaysContainerProps {
  pickKey: string;
  onClickChange: (key: string) => void;
}

export default function PopularDaysContainer({
  pickKey,
  onClickChange,
}: PopularDaysContainerProps) {
  const { data, isSuccess } = useQuery({
    queryKey: ["popularDays"],
    queryFn: getPopularDays,
    select: (days) => {
      return days.data.sort(
        (a: IDays, b: IDays) => parseInt(b.key) - parseInt(a.key)
      );
    },
  });

  useEffect(() => {
    if (isSuccess) {
      onClickChange(data[0].key);
    }
  }, [data]);
  return (
    <>
      <div className="mb-4">
        <div className="badge badge-soft badge-primary badge-xl">인기글</div>
      </div>
      <div className="">
        {isSuccess &&
          data.map((day: IDays) => (
            <div
              key={day.key}
              className={`mb-1 mr-1 cursor-pointer badge ${
                pickKey !== day.key && "badge-soft"
              } badge-info`}
              onClick={() => onClickChange(day.key)}
            >
              {day.message}
            </div>
          ))}
      </div>
    </>
  );
}
