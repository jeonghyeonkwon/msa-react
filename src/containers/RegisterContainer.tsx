"use client";
import { register } from "@/api/auth";
import CAlert from "@/components/CAlert";
import { IRegister } from "@/interfaces/Auth";
import { AlertEnum } from "@/interfaces/components/Alert";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function RegisterContainer() {
  const router = useRouter();
  const [form, setForm] = useState<IRegister>({
    username: "",
    password: "",
    nickName: "",
  });

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    },
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    [form]
  );
  const onClickRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(form);
  };
  return (
    <div className="flex items-center justify-center w-full h-full overflow-hidden">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <h2 className="mb-3 card-title">Register</h2>
          <label className="mb-3 input ">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              type="input"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="아이디"
              title="Only letters, numbers or dash"
              disabled={isPending || isSuccess}
            />
          </label>

          <label className="mb-3 input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호"
              disabled={isPending || isSuccess}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>
          <input
            type="text"
            name="nickName"
            value={form.nickName}
            onChange={handleChange}
            placeholder="닉네임"
            disabled={isPending || isSuccess}
            className="mb-3 input"
          />
          <div className="justify-end card-actions">
            <button
              className="btn btn-primary btn-block"
              onClick={(e) => onClickRegister(e)}
              disabled={isPending || isSuccess}
            >
              회원가입
            </button>
          </div>
          {isSuccess && (
            <CAlert type={AlertEnum.SUCCESS}>
              회원 가입 성공! <br />
              (3초 뒤 로그인 페이지로 이동합니다.)
            </CAlert>
          )}
          {isError && <CAlert type={AlertEnum.ERROR}>{error.message}</CAlert>}
        </div>
      </div>
    </div>
  );
}
