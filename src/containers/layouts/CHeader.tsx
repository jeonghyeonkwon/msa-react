"use client";

import { logoutAction } from "@/store/authSlice";
import { AppDispatch, RootState } from "@/store/store";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface CHeaderProps {
  headerRef: React.RefObject<HTMLDivElement | null>;
}
export default function CHeader({ headerRef }: CHeaderProps) {
  const isSuccess = useSelector((state: RootState) => state.auth.isSuccess);
  const dispatch = useDispatch<AppDispatch>();

  const onClickLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="shadow-sm navbar bg-base-100" ref={headerRef}>
      <div className="flex-1">
        <a className="text-xl btn btn-ghost">MSA</a>
      </div>
      <div className="flex gap-2">
        {!isSuccess && (
          <Link href="/login">
            <button className="btn btn-accent">로그인</button>
          </Link>
        )}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="p-2 mt-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box z-1 w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            {isSuccess && (
              <li>
                <a onClick={onClickLogout}>Logout</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
