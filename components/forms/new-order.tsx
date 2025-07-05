import { getAllProducts } from "@/lib/products/products";
import { getAllClients } from "@/lib/clients/clients";
import { NewOrderFormContent } from "@/components/forms/new-order-form-content";
import { getAllVendors } from "@/lib/vendors/vendors";

export async function NewOrderForm() {
  const products = await getAllProducts();
  const clients = await getAllClients();
  const vendors = await getAllVendors();

  return (
    <>
      <NewOrderFormContent
        clients={clients}
        products={products}
        vendors={vendors}
      />
    </>
  );
}
