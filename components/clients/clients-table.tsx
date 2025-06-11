import Link from "next/link";
import {
  CustomTable,
  TableHeader,
  TableBody,
  TableRow,
  TableRowContent,
} from "@/components/custom-table";
import { ClientWithStats } from "@/types/clients";

export async function ClientsTable({
  clients,
}: {
  clients: ClientWithStats[];
}) {
  const colNames = [
    "Client",
    "Email",
    "Orders",
    "Total Spent",
    "Status",
    "LastOrder",
  ];

  return (
    <>
      <CustomTable>
        <TableHeader colNames={colNames} />
        <TableBody>
          {clients.map((client) => (
            <Link
              key={client.id}
              href={`/clients/${client.id}/summary`}
              className="block"
            >
              <TableRow colCount={colNames.length}>
                <TableRowContent
                  content={client.name}
                  className="font-medium"
                />
                <TableRowContent
                  content={client.email}
                  className="text-custom-gray"
                />
                <TableRowContent
                  content={client.phone}
                  className="text-custom-gray"
                />
                <TableRowContent
                  content={client.totalOrders}
                  className="text-custom-gray"
                />
                <TableRowContent
                  content={client.totalSpent}
                  className="text-custom-white"
                />
                <TableRowContent
                  content={
                    client.lastOrder ? client.lastOrder.toDateString() : ""
                  }
                  className="text-custom-gray"
                />
              </TableRow>
            </Link>
          ))}
          {clients.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No clients matching your search.
            </div>
          )}
        </TableBody>
      </CustomTable>
    </>
  );
}
