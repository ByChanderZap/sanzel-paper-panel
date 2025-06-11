import { db } from "@/lib/db"
import { Prisma } from "@prisma/client"

export async function createProduct(data: Prisma.ProductsCreateInput) {
  await db.products.create({data})
}
