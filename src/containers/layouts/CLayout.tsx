import { ReactNode } from "react";

interface CLayoutProps {
  children: ReactNode;
}

export default function CLayout({ children }: CLayoutProps) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="mockup-phone border-primary">
        <div className="mockup-phone-camera"></div>
        <div className="mockup-phone-display">{children}</div>
      </div>
    </div>
  );
}
