import { fetchDetailedOrderById } from "@/lib/orders/orders";
import { BreadCrumb } from "@/components/detailed-bread-crumb";
import { RightOrderSummaryColumn } from "./components/right-column";
import { OrderSummaryHeader } from "./components/header";
import { LeftOrderSummaryColumn } from "./components/left-column";

type SummaryPageProps = {
  params: { id: string };
};

export default async function OrderDetailsPage({ params }: SummaryPageProps) {
  const { id } = await params;
  const orderData = await fetchDetailedOrderById(id);
  // console.log(orderData);

  // const [selectedStatus, setSelectedStatus] = useState("PENDING");
  // const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // const statusOptions = [
  //   { value: "PENDING", label: "Pending", color: "bg-yellow-500" },
  //   { value: "PROCESSING", label: "Processing", color: "bg-blue-500" },
  //   { value: "SHIPPED", label: "Shipped", color: "bg-purple-500" },
  //   { value: "DELIVERED", label: "Delivered", color: "bg-green-500" },
  //   { value: "CANCELLED", label: "Cancelled", color: "bg-red-500" },
  // ];

  // const handleStatusChange = (status) => {
  //   setSelectedStatus(status);
  //   setIsStatusDropdownOpen(false);
  // };

  // const handleUpdateStatus = () => {
  //   console.log("Updating status to:", selectedStatus);
  //   // Add your status update logic here
  // };

  // const getCurrentStatusColor = () => {
  //   const status = statusOptions.find((s) => s.value === selectedStatus);
  //   return status ? status.color : "bg-gray-500";
  // };

  return (
    <div className="min-h-screen bg-primary text-white p-8">
      {/* Breadcrumb */}
      <BreadCrumb
        currentContent="Order"
        href="/orders"
        id={orderData?.id}
        title="Orders"
      />

      {/* Order Header */}
      <OrderSummaryHeader
        id={orderData?.id}
        createdAt={orderData?.createdAt.toDateString()}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Order Details */}
        <LeftOrderSummaryColumn orderData={orderData} />

        {/* Right Column - Order Status */}
        <RightOrderSummaryColumn
          datePlaced={orderData?.createdAt.toDateString()}
          id={orderData?.id}
          itemsQuantity={orderData?.orderItems.length}
          orderStatus={orderData?.status}
        />
      </div>
    </div>
  );
}
