import { fetchDetailedOrderById } from "@/lib/orders/orders";
import { BreadCrumb } from "@/components/detailed-bread-crumb";
import { RightOrderSummaryColumn } from "./components/right-column";
import { OrderSummaryHeader } from "./components/header";
import { LeftOrderSummaryColumn } from "./components/left-column";

type SummaryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailsPage({ params }: SummaryPageProps) {
  const { id } = await params;
  const orderData = await fetchDetailedOrderById(id);

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
