"use client";
import { useEffect, useRef } from "react";

interface CModalProps {
  isOpen: boolean;
}
export default function CModal({ isOpen }: CModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current!.showModal();
    }
  }, [isOpen]);
  return (
    <dialog id="my_modal_2" className="modal " ref={modalRef}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">Hello!</h3>
        <p className="py-4">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
