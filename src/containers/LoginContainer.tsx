import { login } from "@/api/auth";
import CAlert from "@/components/CAlert";
import { IAuth } from "@/interfaces/Auth";
import { IAlertEnum } from "@/interfaces/components/Alert";
import { successAuth } from "@/store/authSlice";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginContainer() {
  const router = useRouter();
  const [form, setForm] = useState<IAuth>({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: login,
    onSuccess(data) {
      dispatch(successAuth());
      setTimeout(() => {
        router.push("/");
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
  const onClickLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(form);
  };
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <h2 className="mb-3 card-title">Login</h2>
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
              placeholder="아이디"
              name="username"
              onChange={handleChange}
              disabled={isPending || isSuccess}
              title="Only letters, numbers or dash"
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
              onChange={handleChange}
              placeholder="비밀번호"
              disabled={isPending || isSuccess}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>

          <div className="justify-end card-actions">
            <button
              className="btn btn-primary btn-block"
              onClick={onClickLogin}
              disabled={isPending || isSuccess}
            >
              로그인
            </button>
          </div>
          <div className="justify-end card-actions">
            <Link className="btn btn-success btn-block" href="/register">
              회원가입
            </Link>
          </div>
          {isSuccess && (
            <CAlert type={IAlertEnum.SUCCESS}>
              로그인 성공 <br /> 3초 뒤 이동합니다
            </CAlert>
          )}
          {isError && <CAlert type={IAlertEnum.ERROR}>{error.message}</CAlert>}
        </div>
      </div>
    </div>
  );
}
