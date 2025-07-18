import { Plus } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "@/components/search-bar";
import { ProductsPageContent } from "@/components/products/products-content";
import { fetchProductsTotalPages } from "@/lib/products/products";
import { Pagination } from "@/components/pagination";

type SearchParams = Promise<{
  query?: string;
  page?: string;
}>;

interface PageProps {
  searchParams: SearchParams;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params?.query || "";
  const currentPage = Number(params?.page) || 1;
  const totalPages = await fetchProductsTotalPages(query);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link
          href="/products/new"
          className="bg-secondary hover:bg-secondary/80 px-6 py-2 rounded-full font-medium transition-colors"
        >
          <Plus size={24} />
        </Link>
      </div>

      {/* Search bar */}
      <SearchBar placeholder="Search products..." />

      <ProductsPageContent currentPage={currentPage} query={query} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
