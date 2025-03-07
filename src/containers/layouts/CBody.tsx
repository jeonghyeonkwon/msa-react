import { ReactNode } from "react";

interface CBodyProps {
  children: ReactNode;
}
export default function CBody({ children }: CBodyProps) {
  return <>{children}</>;
}
