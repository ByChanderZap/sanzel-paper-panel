"use client";

import Image from "next/image.js";
import { usePathname } from "next/navigation.js";
import { Home, Package, Users, BarChart3, FileText, X } from "lucide-react";
import Link from "next/link.js";
import SanzelNoBackground from "@/public/sanzel-no-background.png";

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
  ];

  const isActive = (href: string) => {
    return pathname === href || (pathname === "/" && href === "/dashboard");
  };

  const handleCloseSession = () => {
    console.log("closing session");
    onClose?.(); // Close sidebar on mobile after action
  };

  const handleNavClick = () => {
    // Close sidebar on mobile when navigating
    onClose?.();
  };

  return (
    <div className="w-64 bg-primary p-6 relative h-full">
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

      <nav>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleNavClick}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
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

      <div className="absolute bottom-6 left-6 right-6">
        <button
          onClick={handleCloseSession}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors w-full"
        >
          <X size={20} />
          <span>Close Session</span>
        </button>
      </div>
    </div>
  );
};
