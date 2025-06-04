import Link from "next/link";
import { ClientPreview } from "@/types/clients";
import {
  CustomTable,
  TableHeader,
  TableBody,
  TableRow,
  TableRowContent,
} from "@/components/custom-table";

export async function ClientsTable({ clients }: { clients: ClientPreview[] }) {
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
                  content={client.client}
                  className="font-medium"
                />
                <TableRowContent
                  content={client.email}
                  className="text-custom-gray"
                />
                <TableRowContent
                  content={client.orders}
                  className="text-custom-gray"
                />
                <TableRowContent
                  content={client.totalSpent}
                  className="text-custom-white"
                />
                <TableRowContent
                  content={
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary">
                      {client.status}
                    </span>
                  }
                />
                <TableRowContent
                  content={client.lastOrder}
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
