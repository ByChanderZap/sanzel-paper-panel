import { Plus } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "@/components/search-bar";
import { OrdersPageContent } from "@/components/orders/orders-content";
import { Pagination } from "@/components/pagination";
import { fetchOrdersTotalPages } from "@/lib/orders/orders";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const params = await searchParams;
  const query = params?.query || "";
  const currentPage = Number(params?.page) || 1;
  const totalPages = await fetchOrdersTotalPages(query);
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Link
          href="/orders/new"
          className="bg-secondary hover:bg-secondary/80 px-6 py-2 rounded-full font-medium transition-colors"
        >
          <Plus size={24} />
        </Link>
      </div>

      {/* Search Bar */}
      <SearchBar placeholder="Search orders..." />

      <OrdersPageContent query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
