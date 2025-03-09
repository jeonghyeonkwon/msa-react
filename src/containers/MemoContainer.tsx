"use client";

import Link from "next/link";
export default function MemoContainer() {
  return (
    <>
      <div className="h-auto scrollbar-hide">
        <div className="w-full mb-3 card card-dash bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Card Title</h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
            <div className="justify-end card-actions">
              <Link href={`/memo/234234`} className="btn btn-success">
                자세히
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mb-3 join">
          <button className="join-item btn">«</button>
          <button className="join-item btn btn-md">1</button>
          <button className="join-item btn btn-md btn-active">2</button>
          <button className="join-item btn btn-md">3</button>
          <button className="join-item btn btn-md">4</button>
          <button className="join-item btn btn-md">5</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
    </>
  );
}
