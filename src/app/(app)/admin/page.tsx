import { SubmissionsTable } from "@/components/admin/SubmissionsTable";
import { getSubmissions } from "@/lib/data";

export default function AdminPage() {
  const submissions = getSubmissions();

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Review and manage all user submissions.
          </p>
        </div>
      </div>
    </div>
  );
}
