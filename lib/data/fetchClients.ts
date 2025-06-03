import { ClientPreview } from "@/types/clients";
import { ClientsSummaryMock } from "@/mocks/clients"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchClients = async(query?: string, page?: number): Promise<ClientPreview[]> => {
  // TODO: Implement real logic and pagination
  // For now, we will use the mock data
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredClients = ClientsSummaryMock
      .filter((client) => matchClients(client, query))

      resolve(filteredClients)
    }, 100)
  })
}
const matchClients = (client: ClientPreview, query?: string): boolean => {
  if (!query) {
    return true;
  }
  return client.client.includes(query) || client.email.includes(query);
}
