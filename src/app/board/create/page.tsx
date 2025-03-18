"use client";
import BackButton from "@/components/BackButton";
import BoardCreateContainer from "@/containers/BoardCreateContainer";
import { useRouter } from "next/navigation";

export default function BoardCreate() {
  const router = useRouter();
  return (
    <div className="h-full overflow-y-auto ">
      <div className="mb-2">
        <BackButton onClickBack={() => router.back()} />
      </div>
      <BoardCreateContainer />
    </div>
  );
}
