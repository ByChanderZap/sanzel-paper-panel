import { TempOrderType } from "@/types/orders";


const orders: TempOrderType[] = [
    {
      id: "1",
      client: "john doe",
      date: "2023-10-01",
      total: 1000,
      status: "delivered",
      // material_name: "material A",
      // quantity: 10,
      // coil_height: 11.5,
      // coil_length: 1500,
      // square_meters: 20.7,
    },
    {
      id: "2",
      client: "john doe",
      date: "2023-10-01",
      total: 2000,
      status: "delivered",
    },
    {
      id: "3",
      client: "john doe",
      date: "2023-10-01",
      total: 3000,
      status: "delivered",
    },
    {
      id: "4",
      client: "Aide Sanchez",
      date: "2023-10-01",
      total: 4000,
      status: "delivered",
    },
    {
      id: "41",
      client: "Alexander Hamilton",
      date: "2023-10-01",
      total: 4000,
      status: "delivered",
    },
    {
      id: "5",
      client: "Alexander Hamilton",
      date: "2023-10-01",
      total: 4000,
      status: "delivered",
    },
    {
      id: "6",
      client: "Jose Jose",
      date: "2023-10-01",
      total: 4000,
      status: "delivered",
    },
    {
      id: "7",
      client: "Lololol",
      date: "2023-10-01",
      total: 4000,
      status: "delivered",
    },
    {
      id: "8",
      client: "weird name dude",
      date: "2023-10-01",
      total: 4000,
      status: "delivered",
    },
  ];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getOrdersPreview = async (query?: string, page?: number): Promise<TempOrderType[]> => {
  //TODO: IMPLEMENT REAL LOGIC
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredOrders = orders
        .filter((order) => matchOrders(order, query))
        
        resolve(filteredOrders)
    }, 300)
  })
}

const matchOrders = (order: TempOrderType, query?: string): boolean => {
  if (!query) {
    return true
  }
  return order.client.includes(query) || order.id.includes(query)
}
