import { ProductPreviewTmp } from "@/types/products";
import {
  CustomTable,
  TableHeader,
  TableBody,
  TableRow,
  TableRowContent,
} from "@/components/custom-table";

export async function ProductsTable({
  products,
}: {
  products: ProductPreviewTmp[];
}) {
  const colNames = ["Id", "Name", "Price", "Stock", "Quality"];

  return (
    <>
      <CustomTable>
        {/* Table Header */}
        <TableHeader colNames={colNames} />
        {/* Table Body */}
        <TableBody>
          {products.map((prod) => (
            <TableRow colCount={colNames.length} key={prod.id}>
              <TableRowContent content={prod.id} className="font-medium" />
              <TableRowContent
                content={prod.name}
                className="text-custom-white"
              />
              <TableRowContent
                content={prod.material_price}
                className="text-custom-gray"
              />
              <TableRowContent content={prod.stock} className="font-medium" />
              <TableRowContent content={prod.quality} className="font-medium" />
            </TableRow>
          ))}
        </TableBody>
      </CustomTable>
    </>
  );
}
