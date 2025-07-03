// prisma/seed.ts
import { PrismaClient, OrderStatus, PaperQuality } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create some clients
  const client1 = await prisma.clients.create({
    data: {
      name: 'Alice Smith',
      email: 'alice@example.com',
      phone: '1234567890',
      address: '123 Main St',
      city: 'Metropolis',
      state: 'NY',
    },
  });

  const client2 = await prisma.clients.create({
    data: {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '0987654321',
      address: '456 Elm St',
      city: 'Gotham',
      state: 'NJ',
    },
  });

  // Create some products
  const product1 = await prisma.products.create({
    data: {
      name: 'Premium Paper',
      description: 'High quality paper',
      quality: PaperQuality.PRIMERA,
      stock: 100,
      unit_price: 2500,
      width: 1.2,
      linear_size: 100,
    },
  });

  const product2 = await prisma.products.create({
    data: {
      name: 'Standard Paper',
      description: 'Standard quality paper',
      quality: PaperQuality.LINEA,
      stock: 200,
      unit_price: 1500,
      width: 1.0,
      linear_size: 200,
    },
  });

  // Create an order for client1
  const order1 = await prisma.orders.create({
    data: {
      clientId: client1.id,
      price: 5000,
      status: OrderStatus.PENDING,
      orderItems: {
        create: [
          {
            productId: product1.id,
            quantity: 2,
            unit_price: 2500,
            item_total: 5000,
            width: 1.2,
            linear_size: 100,
          },
        ],
      },
    },
  });

  // Create an order for client2
  const order2 = await prisma.orders.create({
    data: {
      clientId: client2.id,
      price: 3000,
      status: OrderStatus.CONFIRMED,
      orderItems: {
        create: [
          {
            productId: product2.id,
            quantity: 2,
            unit_price: 1500,
            item_total: 3000,
            width: 1.0,
            linear_size: 200,
          },
        ],
      },
    },
  });

  console.log('Seed data created!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
