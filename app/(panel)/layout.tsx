"use client";

import { Sidebar } from "@/components/layout/sidebar";

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-primary text-custom-white flex">
      <Sidebar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
};

export default PanelLayout;
