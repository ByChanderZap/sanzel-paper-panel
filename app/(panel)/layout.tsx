"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";
import { SignedOut, RedirectToSignIn, SignedIn } from "@clerk/nextjs";

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-primary text-custom-white flex">
          {/* Mobile hamburger button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`
            fixed md:relative inset-y-0 left-0 z-50 
            transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0 transition-transform duration-200 ease-in-out
            `}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 md:p-8">
            {/* Add top padding on mobile to account for hamburger button */}
            <div className="pt-12 md:pt-0">{children}</div>
          </div>
        </div>
      </SignedIn>
    </>
  );
};

export default PanelLayout;
