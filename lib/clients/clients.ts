import { db } from "@/lib/db"
import { Prisma } from "@prisma/client"

export async function createClient(data: Prisma.ClientsCreateInput)  {
   await db.clients.create({
    data: {
      address: data.address,
      city: data.city,
      email: data.email,
      phone: data.phone,
      shippingNumber: data.shippingNumber,
      state: data.state,
    }
  })
}
