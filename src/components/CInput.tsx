interface CInputProps {
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export default function CInput({
  name,
  value,
  onChange,
  type,
  placeholder,
}: CInputProps) {
  return (
    <>
      <label className="input validator">
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
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          required
          placeholder={placeholder}
        />
      </label>
      <p className="validator-hint">
        Must be 3 to 30 characters
        <br />
        containing only letters, numbers or dash
      </p>
    </>
  );
}
