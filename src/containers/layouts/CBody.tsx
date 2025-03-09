import { ReactNode } from "react";

interface CBodyProps {
  children: ReactNode;
  footerHeight: number;
  headerHeight: number;
}
export default function CBody({
  children,
  footerHeight,
  headerHeight,
}: CBodyProps) {
  console.log("footerHeight", footerHeight);
  console.log("headerHeight", headerHeight);
  return (
    <div
      style={{
        height: `calc(100% - ${footerHeight}px - ${headerHeight}px )`,
      }}
      className="pt-2 pb-2"
    >
      {children}
    </div>
  );
}
