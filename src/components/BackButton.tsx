interface BackButtonProps {
  onClickBack: React.MouseEventHandler<HTMLButtonElement>;
}

export default function BackButton({ onClickBack }: BackButtonProps) {
  return (
    <button className="btn" onClick={onClickBack}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="size-[2.5em]"
      >
        <path
          d="M21 11H6.83l3.58-3.59L9 6l-6 6l6 6l1.41-1.41L6.83 13H21z"
          fill="currentColor"
        ></path>
      </svg>
    </button>
  );
}
