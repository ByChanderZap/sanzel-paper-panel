import { db } from "@/lib/db"
import { Prisma, Products } from "@prisma/client"

export async function createProduct(data: Prisma.ProductsCreateInput) {
  await db.products.create({data})
}
 
const PAGE_SIZE = 10;
export const fetchProducts = async (query?: string, page: number = 1): Promise<Products[]> => {
  const where: Prisma.ProductsWhereInput = { deletedAt: null };

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  const products = await db.products.findMany({
    where,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: { createdAt: "desc" },
  });

  return products;
};

export const fetchProductsTotalPages = async (query?: string): Promise<number> => {
  const where: Prisma.ProductsWhereInput = { deletedAt: null };

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  const count = await db.products.count({ where });
  const totalPages = Math.ceil(count / PAGE_SIZE);
  return totalPages;
};
