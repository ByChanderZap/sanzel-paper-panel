import { MobileCardLayout } from "@/components/mobile-card/mobile-card-layout";
import { MobileCardTop } from "@/components/mobile-card/mobile-card-top";
import MobileCardBottom from "@/components/mobile-card/mobile-card-bottom";
import { Products } from "@prisma/client";

export async function MobileProductsTable({
  products,
}: {
  products: Products[];
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
            leftTextContent={product.unit_price.toString()}
            middleTextHeader="Stock"
            middleTextContent={product.stock.toString()}
          />
        </MobileCardLayout>
      ))}
    </div>
  );
}
