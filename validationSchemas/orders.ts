
import { z } from 'zod'
// Define the Zod schema for order validation
const OrderItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  name: z.string(),
  quantity: z.number().int().positive(),
  width: z.number().positive(),
  linear_size: z.number().positive(),
  unit_price: z.number().positive()
})

export const CreateOrderSchema = z.object({
  clientId: z.string().min(1, 'Client is required'),
  status: z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
  orderItems: z.array(OrderItemSchema).min(1, 'At least one order item is required'),
  orderTotal: z.number().positive('Order total must be positive')
})
