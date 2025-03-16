"use client";
import BackButton from "@/components/BackButton";
import MemoDetailContainer from "@/containers/MemoDetailContainer";
import { useParams, useRouter } from "next/navigation";

export default function MemoDetail() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  return (
    <div>
      <div className="mb-2">
        <BackButton onClickBack={() => router.back()} />
      </div>
      <MemoDetailContainer memoId={params.slug} />
    </div>
  );
}
