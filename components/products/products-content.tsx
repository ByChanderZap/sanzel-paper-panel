import { ProductsContentProps } from "@/types/products";
import { ProductsTable } from "@/components/products/products-table";
import { MobileProductsTable } from "@/components/products/mobile-products-table";
import { fetchProducts } from "@/lib/products/products";

export async function ProductsPageContent({
  query,
  currentPage = 1,
}: ProductsContentProps) {
  const products = await fetchProducts(query, currentPage);
  return (
    <>
      {/* Desktop Layout */}
      <ProductsTable products={products} />

      {/* Mobile Layout */}
      <MobileProductsTable products={products} />
    </>
  );
}
