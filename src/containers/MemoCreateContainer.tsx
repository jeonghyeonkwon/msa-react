"use client";

import { certification } from "@/api/auth";
import { createMemo } from "@/api/memo";
import { IMemo } from "@/interfaces/Memo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function MemoCreateContainer() {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["usersIds"],
    queryFn: certification,
  });

  const [form, setForm] = useState<IMemo>({
    title: "",
    content: "",
    startDate: "",
    endDate: "",
  });

  const { mutate, isError, isPending, isSuccess, error } = useMutation({
    mutationFn: createMemo,
    onSuccess: (data) => {
      router.push("/memo");
    },
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    mutate({
      usersId: data.data,
      dto: form,
    });
  };

  return (
    <div className="flex items-center justify-center w-full ">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <h2 className="mb-3 card-title">메모 등록</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">제목</legend>
            <input
              type="text"
              className="input"
              name="title"
              value={form.title}
              onChange={handleChange}
              disabled={isSuccess || isPending}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">내용</legend>
            <textarea
              className="textarea"
              name="content"
              value={form.content}
              onChange={handleChange}
              disabled={isSuccess || isPending}
            ></textarea>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">시작일</legend>
            <input
              type="datetime-local"
              className="input"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              disabled={isSuccess || isPending}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">종료일</legend>
            <input
              type="datetime-local"
              className="input"
              name="endDate"
              value={form.endDate}
              disabled={isSuccess || isPending}
              onChange={handleChange}
            />
          </fieldset>
          <div className="justify-end card-actions">
            <button
              className="btn btn-success btn-block"
              onClick={onClickRegister}
              disabled={isSuccess || isSuccess}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
