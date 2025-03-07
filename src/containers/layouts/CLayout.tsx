"use client";
import { ReactNode, useState } from "react";

interface CLayoutProps {
  children: ReactNode;
}

export default function CLayout({ children }: CLayoutProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  window.addEventListener("resize", handleResize);

  return (
    <>
      {isMobile ? (
        <>{children}</>
      ) : (
        <div className="w-full h-screen flex justify-center items-center ">
          <div className="mockup-phone border-primary">
            <div className="mockup-phone-camera"></div>
            <div className="mockup-phone-display relative">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
