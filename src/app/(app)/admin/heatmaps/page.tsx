import { Heatmap } from "@/components/admin/Heatmap";

export default function HeatmapPage() {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">
            Heatmap Analysis
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Analyze and compare submission data across different tests.
          </p>
        </div>
        <Heatmap />
      </div>
    </div>
  );
}
