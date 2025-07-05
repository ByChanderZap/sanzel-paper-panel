import Link from "next/link";
import { fetchVendors } from "@/actions/vendors";

export default async function VendorsPage() {
  const vendors = await fetchVendors();
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Vendors</h1>
        <Link
          href="/vendors/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          New Vendor
        </Link>
      </div>
      <table className="min-w-full  rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left text-gray-300">Name</th>
            <th className="py-2 px-4 text-left text-gray-300">Phone</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id} className="border-b border-gray-700">
              <td className="py-2 px-4 text-white">{vendor.name}</td>
              <td className="py-2 px-4 text-white">{vendor.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
