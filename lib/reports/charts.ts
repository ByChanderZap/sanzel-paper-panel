import { db } from "../db"

export interface MonthlyRevenueData {
  month: string;
  revenue: number;
  date: Date;
}

export const getMonthlySales = async (year?: number, monthsBack: number = 12) => {
  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() - monthsBack)

  const orders = await db.orders.findMany({
    where: {
      deletedAt: null,
      status: {
        notIn: ["CANCELLED", "NOT_PAID"]
      },
      createdAt: {
        gte: startDate,
        ...(year && {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${year + 1}-01-01`)
        })
      }
    },
    select: {
      price: true,
      createdAt: true,
      discount: true
    }
  })

  const monthlyData = orders.reduce((acc, order) => {
    const monthKey = order.createdAt.toISOString().substring(0, 7)
    const finalPrice = order.price - (order.discount || 0)

    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthKey,
        revenue: 0,
        date: new Date(monthKey + '-01')
      }
    }
    acc[monthKey].revenue += finalPrice;
    return acc;
  }, {} as Record<string, MonthlyRevenueData>);

  return Object.values(monthlyData)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((item) => ({
      ...item,
      month: item.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric'})
    }))
}

export const getMonthlyRevenue = async () => {
  const currentYear = new Date().getFullYear()
  const monthlyData = await getMonthlySales(currentYear,1)
  return monthlyData[0]?.revenue
}

export const getCurrentMonthRevenue = async () => {
  const today = new Date()
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1)
  const orders = await db.orders.count({
    where: {
      deletedAt: null,
      createdAt: {
        gte: startDate,
      },
    },
  })
  return orders
}

export const getMonthlyToBePaid = async (year?: number, monthsBack: number = 12) => {
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - monthsBack);

  const orders = await db.orders.findMany({
    where: {
      deletedAt: null,
      status: "NOT_PAID",
      createdAt: {
        gte: startDate,
        ...(year && {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${year + 1}-01-01`)
        })
      }
    },
    select: {
      price: true,
      createdAt: true,
      discount: true
    }
  });

  // Group by month and sum the price (minus discount if any)
  const monthlyTotals: { [key: string]: number } = {};
  orders.forEach(order => {
    const date = new Date(order.createdAt);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const total = order.price - (order.discount || 0);
    monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + total;
  });

  return monthlyTotals;
}

export const getUnpayedOrders = async () => {
  const orders = await db.orders.findMany({
    select: {
      id: true,
      price: true,
      createdAt: true,
        client: {
          select: {
            name: true,
            email: true,
            phone: true,
          }
        }
    },
    where: {
      deletedAt: null,
      status: "NOT_PAID"
    }
  })
  return orders
}

export const getOrdersReport = async (startDate: Date) => {
  const orders = await db.orders.findMany({
    where: {
      deletedAt: null,
      createdAt: {
        gte: startDate,
      },
    },
    select: {
      id: true,
      price: true,
      createdAt: true,
      client: {
        select: {
          name: true,
        },
      },
      orderItems: {
        select: {
          product: {
            select: {
              name: true,
            },
          },
          quantity: true,
          unit_price: true,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  return orders;
}
