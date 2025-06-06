import { SearchBar } from "@/components/search-bar";
import { ProductsPageContent } from "@/components/products/products-content";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const params = await searchParams;
  const query = params?.query || "";
  const currentPage = Number(params?.page) || 1;
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
      </div>

      {/* Search bar */}
      <SearchBar placeholder="Search products..." />

      <ProductsPageContent currentPage={currentPage} query={query} />
    </>
  );
}
