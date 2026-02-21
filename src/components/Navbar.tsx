"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface NavbarProps {
  companyName?: string;
}

export default function Navbar({ companyName }: NavbarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isPersonalized = companyName && companyName !== "Your Company";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(-100%)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/evios-logo-blue.png"
                alt="EVIOS"
                width={80}
                height={22}
                className="h-5 w-auto"
              />
              {isPersonalized && (
                <>
                  <span className="text-text-muted text-xs">&times;</span>
                  <span className="text-text-secondary text-[13px] font-medium">
                    {companyName}
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center gap-7 text-[13px] text-text-secondary font-medium">
              <a href="#team" className="hover:text-text transition-colors">Team</a>
              <a href="#process" className="hover:text-text transition-colors">Process</a>
              <a href="#insights" className="hover:text-text transition-colors">Insights</a>
              <a href="#discovery" className="hover:text-text transition-colors">Discovery</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
