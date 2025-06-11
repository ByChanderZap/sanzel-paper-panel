"use client";

import clsx from "clsx";
import Link from "next/link";
import { generatePagination } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-8 mb-4">
      <div className="flex items-center bg-gray-800 rounded-lg p-1 gap-1">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-8 w-8 items-center justify-center text-sm font-medium rounded-md transition-all duration-200",
    {
      "bg-blue-600 text-white": isActive,
      "text-gray-300 hover:bg-gray-700 hover:text-white":
        !isActive && position !== "middle",
      "text-gray-500 cursor-default": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200",
    {
      "text-gray-500 cursor-not-allowed": isDisabled,
      "text-gray-300 hover:bg-gray-700 hover:text-white": !isDisabled,
    }
  );

  const icon =
    direction === "left" ? (
      <ArrowLeft className="w-4 h-4" />
    ) : (
      <ArrowRight className="w-4 h-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
