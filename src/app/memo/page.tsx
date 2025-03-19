import MemoListContainer from "@/containers/MemoListContainer";
import Link from "next/link";
export default function Memo() {
  return (
    <div className="h-full overflow-y-auto">
      <Link href="/memo/create" className="mb-2 ml-2 btn btn-info">
        New.
      </Link>

      <MemoListContainer />
    </div>
  );
}
