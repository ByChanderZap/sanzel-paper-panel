"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { generateOrdersReport } from "../actions/generateOrdersReport";
import { generateUnpaidOrdersReport } from "../actions/generateUnpaidOrdersReport";
import { generateOrdersLastMonthReport } from "../actions/generateOrdersLastMonthReport";
import { generateUnpaidOrdersLastMonthReport } from "../actions/generateUnpaidOrdersLastMonthReport";

export function ReportGenerationSection() {
  const [reportType, setReportType] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);

  const reportTypes = [
    { value: "orders", label: "Orders Report" },
    { value: "unpayed", label: "Unpayed Orders" },
    { value: "orders-month", label: "Orders from last month" },
    { value: "unpayed-month", label: "Unpayed Orders from last month" },
  ];

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => {
    const year = currentYear - i;
    return { value: String(year), label: String(year) };
  });

  const handleGenerateReport = async () => {
    if (!reportType) {
      alert("Please select report type.");
      return;
    }
    // For month/year reports, skip validation
    if (
      (reportType === "orders" || reportType === "unpayed") &&
      (!month || !year)
    ) {
      alert("Please select month and year.");
      return;
    }
    setLoading(true);
    try {
      let base64: string | undefined;
      let filename = "";
      if (reportType === "orders") {
        base64 = await generateOrdersReport({ month, year });
        filename = `orders-report-${year}-${month}.pdf`;
      } else if (reportType === "unpayed") {
        base64 = await generateUnpaidOrdersReport({ month, year });
        filename = `unpaid-orders-report-${year}-${month}.pdf`;
      } else if (reportType === "orders-month") {
        base64 = await generateOrdersLastMonthReport();
        filename = `orders-report-last-month.pdf`;
      } else if (reportType === "unpayed-month") {
        base64 = await generateUnpaidOrdersLastMonthReport();
        filename = `unpaid-orders-report-last-month.pdf`;
      } else {
        alert("Report type not implemented yet.");
        setLoading(false);
        return;
      }
      // Convert base64 to Blob
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });
      // Create a download link and click it
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("Failed to generate report.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-white mb-6">
        Report Generation
      </h2>

      <div className="space-y-6 max-w-md">
        {/* Report Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Report Type
          </label>
          <div className="relative">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">Select report type</option>
              {reportTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* Month Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Month
          </label>
          <div className="relative">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              disabled={
                reportType === "orders-month" || reportType === "unpayed-month"
              }
            >
              <option value="">Select month</option>
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* Year Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Year
          </label>
          <div className="relative">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              disabled={
                reportType === "orders-month" || reportType === "unpayed-month"
              }
            >
              <option value="">Select year</option>
              {years.map((y) => (
                <option key={y.value} value={y.value}>
                  {y.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateReport}
          disabled={
            loading ||
            !reportType ||
            ((reportType === "orders" || reportType === "unpayed") &&
              (!month || !year))
          }
          className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {loading ? "Generating..." : "Generate Report"}
        </button>
      </div>
    </section>
  );
}
