"use client";
import { getPopularPosts } from "@/api/popular-posts";
import BoardTable from "@/components/BoardTable";
import { useQuery } from "@tanstack/react-query";

interface PopularPostsProps {
  day: string;
}
export default function PopularPostsContainer({ day }: PopularPostsProps) {
  const { data, isSuccess } = useQuery({
    queryKey: ["day", day],
    queryFn: () =>
      getPopularPosts({
        day: day,
      }),
    enabled: !!day,
  });
  return (
    <>
      {isSuccess && (
        <BoardTable isSuccess={isSuccess} list={data as ISimpleBoard[]} />
      )}
    </>
  );
}
