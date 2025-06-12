import { db } from "@/lib/db"
import { Clients, Prisma } from "@prisma/client"
import { ClientWithStats } from "@/types/clients";

export async function createClient(data: Prisma.ClientsCreateInput)  {
   return await db.clients.create({
    data
  })
}

export const getAllClients = async (): Promise<Clients[]> => {
  return await db.clients.findMany()
}

const PAGE_SIZE = 10;
export const fetchClients = async (query?: string, page: number = 1): Promise<Clients[]> => {
  const where: Prisma.ClientsWhereInput = { deletedAt: null };

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } },
      { city: { contains: query, mode: "insensitive" }},
      { state: {contains: query, mode: "insensitive" } }
    ];
  }

  const products = await db.clients.findMany({
    where,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: { createdAt: "desc" },
  });

  return products;
};

export const fetchClientsWithStats = async (query?: string, page: number = 1): Promise<ClientWithStats[]> => {
  const PAGE_SIZE = 10;
  const where: Prisma.ClientsWhereInput = { deletedAt: null };

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } },
      { city: { contains: query, mode: "insensitive" }},
      { state: { contains: query, mode: "insensitive" } }
    ];
  }

  const clients = await db.clients.findMany({
    where,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: { createdAt: "desc" },
    include: {
      orders: {
        select: {
          price: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  // Map to add stats
  return clients.map(client => {
    const totalOrders = client.orders.length;
    const totalSpent = client.orders.reduce((sum, order) => sum + order.price, 0);
    const lastOrder = client.orders[0]?.createdAt ?? null;
    // Remove orders array from result if you don't want it in the output
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { orders, ...rest } = client;
    return {
      ...rest,
      totalOrders,
      totalSpent,
      lastOrder,
    };
  });
};

export const fetchClientsTotalPages = async (query?: string): Promise<number> => {
  const where: Prisma.ClientsWhereInput = { deletedAt: null };

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } },
      { city: { contains: query, mode: "insensitive" }},
      { state: {contains: query, mode: "insensitive" } }
    ];
  }

  const count = await db.clients.count({ where });
  const totalPages = Math.ceil(count / PAGE_SIZE);
  return totalPages;
};
