"use client";
import BackButton from "@/components/BackButton";
import MemoDetailContainer from "@/containers/MemoDetailContainer";
import { useRouter } from "next/navigation";

interface MemoDetailProps {
  slug: Number;
}
export default function MemoDetail({ params }: { params: MemoDetailProps }) {
  console.log(params.slug);
  const router = useRouter();
  return (
    <div>
      <div className="mb-2">
        <BackButton onClickBack={() => router.back()} />
      </div>
      <MemoDetailContainer />
    </div>
  );
}
