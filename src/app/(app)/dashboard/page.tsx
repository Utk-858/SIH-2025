import { tests, mockUser, getUserSubmissions } from '@/lib/data';
import TestCard from '@/components/dashboard/TestCard';
import UserProgress from '@/components/dashboard/UserProgress';

export default function DashboardPage() {
    const userSubmissions = getUserSubmissions(mockUser.id);
    const completedTests = [...new Set(userSubmissions.map(sub => sub.testId))];

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">
            Welcome back, {mockUser.name}!
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Ready to test your limits? Choose a test to get started.
          </p>
        </div>

        <UserProgress totalTests={tests.length} completedTests={completedTests.length} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      </div>
    </div>
  );
}
