import { certification } from "@/api/auth";
import { createBoard } from "@/api/board";
import CAlert from "@/components/CAlert";
import { IAlertEnum } from "@/interfaces/components/Alert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useCallback, useState } from "react";

export default function BoardCreateContainer() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: usersId } = useQuery({
    queryKey: ["usersIds"],
    queryFn: certification,
  });

  const [form, setForm] = useState<IBoardCreate>({
    title: "",
    content: "",
  });

  const { mutate, isError, isPending, isSuccess, error } = useMutation({
    mutationFn: createBoard,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["board"],
      });
      router.push("/board");
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
      usersId: usersId.data,
      dto: form,
    });
  };

  return (
    <div className="flex items-center justify-center w-full ">
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <h2 className="mb-3 card-title">게시글 등록</h2>
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

          {isError && <CAlert type={IAlertEnum.ERROR}>{error.message}</CAlert>}
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
