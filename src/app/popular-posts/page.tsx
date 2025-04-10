"use client";
import PopularDaysContainer from "@/containers/PopularDaysContainer";
import PopularPostsContainer from "@/containers/PopularPostsContainer";
import { useCallback, useState } from "react";

export default function PopularPosts() {
  const [pickDay, setPickDay] = useState<string>("");
  const handlePickDay = useCallback(
    (key: string) => {
      setPickDay((prev) => key);
    },
    [pickDay]
  );

  return (
    <>
      <PopularDaysContainer pickKey={pickDay} onClickChange={handlePickDay} />
      {pickDay && <PopularPostsContainer day={pickDay} />}
    </>
  );
}
