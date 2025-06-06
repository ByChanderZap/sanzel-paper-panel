import { ProductsContentProps } from "@/types/products";
import { ProductsTable } from "@/components/products/products-table";
import { fetchProducts } from "@/lib/data/fetchProducts";
import { MobileProductsTable } from "@/components/products/mobile-products-table";

export async function ProductsPageContent({
  query,
  currentPage = 1,
}: ProductsContentProps) {
  const products = await fetchProducts(query, currentPage);
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
      </div>

      {/* Desktop Layout */}
      <ProductsTable products={products} />

      {/* Mobile Layout */}
      <MobileProductsTable products={products} />
    </>
  );
}
