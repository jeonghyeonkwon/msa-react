"use client";
import BackButton from "@/components/BackButton";
import MemoCreateContainer from "@/containers/MemoCreateContainer";
import { useRouter } from "next/navigation";

export default function MemoCreate() {
  const router = useRouter();
  return (
    <div className="h-full overflow-y-auto ">
      <div className="mb-2">
        <BackButton onClickBack={() => router.back()} />
      </div>

      <MemoCreateContainer />
    </div>
  );
}
