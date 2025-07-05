import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function createVendor(data: { name: string; phone: string }) {
  return await db.vendor.create({ data });
}

export async function getAllVendors() {
  return await db.vendor.findMany({ where: { deletedAt: null }, orderBy: { createdAt: "desc" } });
} 
