import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, BarChart, Lightbulb } from "lucide-react";

export default function ResultPage() {
  // Static test results
  const results = [
    {
      testType: "Sit-Ups",
      score: 55,
      benchmark: { average: 40, good: 50, excellent: 60 },
      badge: "Gold",
      feedback: "Excellent core strength! Keep working on endurance with planks and side crunches.",
    },
    {
      testType: "Vertical Jump",
      score: 52, // in cm
      benchmark: { average: 40, good: 50, excellent: 60 },
      badge: "Silver",
      feedback: "Strong lower body power. To reach elite level, focus on plyometrics and squats.",
    },
    {
      testType: "Shuttle Run (4x10m)",
      score: 10.5, // in seconds
      benchmark: { average: 12, good: 11, excellent: 10 },
      badge: "Bronze",
      feedback: "Good agility and speed. Improve reaction time with ladder drills and sprints.",
    },
  ];

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8 flex flex-col items-center">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold font-headline tracking-tight">
            Your Fitness Test Results
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Here is the analysis of your performance across multiple tests. Great job!
          </p>
        </div>

        {results.map((res) => (
          <Card key={res.testType} className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="font-headline text-xl">{res.testType}</CardTitle>
              <CardDescription>
                Compared with benchmarks for your age and gender group.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <strong>Your Score:</strong> {res.score}
              </p>
              <p>
                <strong>Benchmarks:</strong> Avg {res.benchmark.average}, Good {res.benchmark.good}, Excellent {res.benchmark.excellent}
              </p>
              <p>
                <strong>Badge:</strong> {res.badge}
              </p>

              <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <h3 className="font-semibold flex items-center text-lg mb-2">
                  <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                  AI Coaching Tips
                </h3>
                <p className="text-primary-foreground/90">{res.feedback}</p>
              </div>
            </CardContent>
          </Card>
        ))}

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
