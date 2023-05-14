import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <div className="h-screen grid grid-cols-8">{children}</div>;
}
