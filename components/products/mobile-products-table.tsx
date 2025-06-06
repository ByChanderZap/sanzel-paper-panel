import { ProductPreviewTmp } from "@/types/products";
import { MobileCardLayout } from "@/components/mobile-card/mobile-card-layout";
import { MobileCardTop } from "@/components/mobile-card/mobile-card-top";
import MobileCardBottom from "@/components/mobile-card/mobile-card-bottom";

export async function MobileProductsTable({
  products,
}: {
  products: ProductPreviewTmp[];
}) {
  return (
    <div className="md:hidden space-y-4">
      {products.map((product) => (
        <MobileCardLayout key={product.id}>
          <MobileCardTop
            primaryContent={product.name}
            secondaryContent={product.id}
            pinText={product.quality}
          />
          <MobileCardBottom
            leftTextHeader={"Price"}
            leftTextContent={product.material_price.toString()}
            middleTextHeader="Stock"
            middleTextContent={product.stock.toString()}
          />
        </MobileCardLayout>
      ))}
    </div>
  );
}
