"use client";
import { ReactNode, useEffect, useRef, useState } from "react";

import CHeader from "./CHeader";
import CBody from "./CBody";
import CFooter from "./CFooter";

interface CLayoutProps {
  children: ReactNode;
}

export default function CLayout({ children }: CLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (footerRef.current) {
      setFooterHeight(footerRef.current.offsetHeight);
    }
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="h-screen relative overflow-hidden">
          <CHeader headerRef={headerRef} />
          <div className="bg-black h-full pl-2 pr-2">
            <CBody footerHeight={footerHeight} headerHeight={headerHeight}>
              {children}
            </CBody>
          </div>
          <CFooter footerRef={footerRef} />
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center ">
          <div className="mockup-phone border-primary">
            <div className="mockup-phone-camera"></div>
            <div className="mockup-phone-display relative">
              <CHeader headerRef={headerRef} />
              <CBody footerHeight={footerHeight} headerHeight={headerHeight}>
                {children}
              </CBody>
              <CFooter footerRef={footerRef} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
