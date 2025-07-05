"use client";

import Image from "next/image.js";
import { usePathname } from "next/navigation.js";
import { Home, Package, Users, BarChart3, FileText, X } from "lucide-react";
import Link from "next/link.js";
import SanzelNoBackground from "@/public/sanzel-no-background.png";
import { UserButton } from "@clerk/nextjs";

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Orders", href: "/orders", icon: Package },
    { name: "Clients", href: "/clients", icon: Users },
    { name: "Products", href: "/products", icon: FileText },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Vendors", href: "/vendors", icon: Users },
  ];

  const isActive = (href: string) => {
    return pathname === href || (pathname === "/" && href === "/dashboard");
  };

  const handleNavClick = () => {
    // Close sidebar on mobile when navigating
    onClose?.();
  };

  return (
    <div className="w-64 bg-primary h-full flex flex-col overflow-hidden">
      {/* Header section */}
      <div className="p-6 flex-shrink-0">
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <X size={20} />
        </button>

        <div className="mb-8">
          <Image
            alt="Logo"
            src={SanzelNoBackground.src}
            width={SanzelNoBackground.width}
            height={SanzelNoBackground.height}
            priority
            className="h-12 w-auto mx-auto"
          />
        </div>
      </div>

      {/* Navigation section - scrollable if needed */}
      <nav className="flex-1 px-6 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleNavClick}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors mb-2 ${
                isActive(item.href)
                  ? "bg-secondary text-custom-white"
                  : "text-gray-300 hover:bg-secondary hover:text-custom-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer section - always at bottom */}
      <div className="p-6 flex-shrink-0">
        <div className="flex items-center space-x-3 px-4 py-4 rounded-lg bg-secondary/50">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 cursor-pointer",
                userButtonPopoverCard: "bg-gray-800 border-gray-700",
                userButtonPopoverActionButton:
                  "text-gray-300 hover:text-white hover:bg-gray-700",
              },
            }}
          />
          <span>Account</span>
        </div>
      </div>
    </div>
  );
};
