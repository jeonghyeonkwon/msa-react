import { ReactNode } from "react";

interface CBodyProps {
  children: ReactNode;
}
export default function CBody({ children }: CBodyProps) {
  return <div className="h-full">{children}</div>;
}
