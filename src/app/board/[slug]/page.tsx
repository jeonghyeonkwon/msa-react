"use client";
import BackButton from "@/components/BackButton";
import BoardDetailContainer from "@/containers/BoardDetailContainer";
import { useParams, useRouter } from "next/navigation";

export default function BoardDetail() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();

  return (
    <div>
      <div className="mb-2">
        <BackButton onClickBack={() => router.back()} />
      </div>
      <BoardDetailContainer boardId={params.slug} />
    </div>
  );
}
