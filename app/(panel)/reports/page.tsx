import { ChartsSection } from "./components/charts/charts-section";
import { ReportsHeader } from "./components/header";
import { ReportGenerationSection } from "./components/report-generation";

export default function ReportsPage() {
  return (
    <div className="p-8 min-h-screen text-white">
      {/* Header */}
      <ReportsHeader />

      {/* Report Generation Section */}
      <ReportGenerationSection />

      {/* Report Preview Section */}
      <ChartsSection />
    </div>
  );
}
