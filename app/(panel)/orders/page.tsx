import { Plus } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "../../../components/search-bar";
import { OrdersTable } from "../../../components/orders/orders-table";
import { MobileOrdersTable } from "../../../components/orders/mobile-orders-table";

export default function OrdersPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

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

      {/* Desktop Table - Hidden on mobile */}
      <OrdersTable query={query} currentPage={currentPage} />

      {/* Mobile Card Layout - Hidden on desktop */}
      <MobileOrdersTable query={query} currentPage={currentPage} />
    </>
  );
}
