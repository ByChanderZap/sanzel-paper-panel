import { CreateOrderData, DetailedOrder, OrdersPreview } from "@/types/orders";
import { db } from "@/lib/db";
import { OrderStatus, Prisma } from "@prisma/client";
// import { Orders } from "@prisma/client";

export const createOrderWithItems = async (data: CreateOrderData) => {
  try {
    return await db.orders.create({
      data:{
        price: data.orderTotal,
        clientId: data.clientId,
        status: data.status,
        orderItems: {
          create: data.orderItems.map((item) => ({
            // ...item
            quantity: item.quantity,
            item_total: item.item_total,
            linear_size: item.linear_size,
            productId: item.productId,
            width: item.width,
            unit_price: item.unit_price,
          }))
        }
      }
    })
  } catch (error) {
    console.error("Database error creating order:", error)

    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string; meta?: unknown }
      
      // Foreign key constraint violation
      if (prismaError.code === 'P2003') {
        throw new Error("One or more products don't exist")
      }
      
      // Unique constraint violation
      if (prismaError.code === 'P2002') {
        throw new Error("Duplicate order item detected")
      }
      
      // Record not found
      if (prismaError.code === 'P2025') {
        throw new Error("Required record not found")
      }
    }
    
    throw new Error("Failed to create order with items")
  }
}


export const validateAndCreateOrderDetailed = async (
  data: CreateOrderData
) => {
  try {
    // Check if client exists
    const client = await db.clients.findUnique({
      where: { id: data.clientId, deletedAt: null },
      select: { id: true, name: true }
    })

    if (!client) {
      throw new Error(`CLIENT_NOT_FOUND: Client with ID ${data.clientId} does not exist`)
    }

    // Check if all products exists
    const productIds = data.orderItems.map(item => item.productId)
    const existingProducts = await db.products.findMany({
      where: {
        id: { in: productIds }
      },
      select: { id: true, name: true }
    })

    const existingProductIds = existingProducts.map((p) => p.id)
    const missignProductIds = productIds.filter(id => !existingProductIds.includes(id))

    if (missignProductIds.length > 0) {
      throw new Error(`PRODUCTS_NOT_FOUND: Products with IDs ${missignProductIds.join(', ')} do not exist`)
    }

    return await createOrderWithItems(data)
    
  } catch (error) {
    console.error("Error validating and creating order:", error)

    throw error
  }
}

const PAGE_SIZE = 10;

export const getOrdersSummary = async (query?: string, page: number = 1): Promise<OrdersPreview[]> => {
  const where: Prisma.OrdersWhereInput = { deletedAt: null }

  if (query) {
    where.OR = [
      { client: { name: { contains: query, mode: "insensitive" }}},
      { client: { city: { contains: query, mode: "insensitive" }}},
      { client: { email: { contains: query, mode: "insensitive"}}},
      { client: { phone: { contains: query, mode: "insensitive" }}},
    ]
  }

  const orders = await db.orders.findMany({
    where,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
    orderBy: { createdAt: "desc" },
    include: {
      client: { select: { name: true } }
    }
  })
  
  return orders
} 

export const fetchOrdersTotalPages = async(query?: string): Promise<number> => {
  const where: Prisma.OrdersWhereInput = { deletedAt: null }

  if (query) {
    where.OR = [
      { client: { name: { contains: query, mode: "insensitive" }}},
      { client: { city: { contains: query, mode: "insensitive" }}},
      { client: { email: { contains: query, mode: "insensitive"}}},
      { client: { phone: { contains: query, mode: "insensitive" }}},
    ]
  }

  const count = await db.orders.count({where})
  const totalPage = Math.ceil(count / PAGE_SIZE)
  return totalPage
}

export const fetchDetailedOrderById = async (id: string): Promise<DetailedOrder | null> => {
  return await db.orders.findFirst({
    where: {
      id: id
    },
    include: {
      client: {},
      orderItems: {
        include: {
          product: {}
        }
      }
    }
  }) 
}

export const updateOrderStatus = async (id: string, status: OrderStatus) => {
  return await db.orders.update({
    where: { id: id },
    data: {
      status: status
    }
  })
}

export const getTotalOrders = async () => {
  return await db.orders.count({
    where: { deletedAt: null }
  })
}
