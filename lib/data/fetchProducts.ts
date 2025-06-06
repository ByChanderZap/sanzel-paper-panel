import { productsMock } from "@/mocks/products"
import { ProductPreviewTmp } from "../../types/products.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchProducts = async(query?: string, page?: number): Promise<ProductPreviewTmp[]> => {
  // TODO: Implement real logic and pagination
  // For now, we will use the mock data
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredProducts = productsMock
      .filter((product) => matchProduct(product, query))

      resolve(filteredProducts)
    }, 100)
  })
}
const matchProduct = (product: ProductPreviewTmp, query?: string): boolean => {
  if (!query) {
    return true;
  }
  return product.id.includes(query) || product.name.includes(query) || product.quality.includes(query);
}
