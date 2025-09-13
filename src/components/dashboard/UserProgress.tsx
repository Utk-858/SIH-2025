'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface UserProgressProps {
  totalTests: number;
  completedTests: number;
}

export default function UserProgress({ totalTests, completedTests }: UserProgressProps) {
    const [progress, setProgress] = useState(0);
    const progressValue = (completedTests / totalTests) * 100;

    useEffect(() => {
        const timer = setTimeout(() => setProgress(progressValue), 500);
        return () => clearTimeout(timer);
    }, [progressValue]);


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
                You have completed {completedTests} out of {totalTests} available tests. Keep going!
            </p>
            <Progress value={progress} className="w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
