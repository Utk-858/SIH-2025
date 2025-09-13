import { getSubmissionById, mockUser, tests, benchmarks } from "@/lib/data";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge as UiBadge } from "@/components/ui/badge";
import Badge from "@/components/results/Badge";
import ResultDisplay from "@/components/results/ResultDisplay";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, BarChart, Lightbulb } from "lucide-react";

export default function ResultPage({ params }: { params: { submissionId: string } }) {
  const submission = getSubmissionById(params.submissionId);

  if (!submission) {
    notFound();
  }

  const test = tests.find((t) => t.id === submission.testId);
  const userBenchmark = benchmarks[submission.testType]?.[mockUser.gender]?.['18-25'];

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8 flex flex-col items-center">
        <div className="text-center">
            {submission.badge && <Badge badge={submission.badge} />}
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold font-headline tracking-tight">
            Your {submission.testType} Results
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Here is the analysis of your performance. Great job!
          </p>
        </div>

        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Performance Metrics</CardTitle>
            <CardDescription>
                Your results are compared to benchmarks for your age and gender group.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResultDisplay submission={submission} benchmark={userBenchmark} test={test}/>
          </CardContent>
        </Card>

        {submission.feedback && (
          <Card className="w-full max-w-2xl bg-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                AI Coaching Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-primary-foreground/90">{submission.feedback}</p>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-4">
            <Button variant="outline" asChild>
                <Link href="/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>
            </Button>
            <Button asChild>
                <Link href="/leaderboard">
                    <BarChart className="mr-2 h-4 w-4" />
                    View Leaderboard
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
