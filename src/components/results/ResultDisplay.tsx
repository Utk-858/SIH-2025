import { Submission, Benchmark, Test } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ResultDisplayProps {
    submission: Submission;
    benchmark?: Benchmark;
    test?: Test;
}

export default function ResultDisplay({ submission, benchmark, test }: ResultDisplayProps) {
    let score: number | undefined;
    let unit: string = '';
    let metricName: string = '';

    if (submission.metrics.jumpHeight) {
        score = submission.metrics.jumpHeight;
        unit = 'cm';
        metricName = 'Jump Height';
    } else if (submission.metrics.reps) {
        score = submission.metrics.reps;
        unit = 'reps';
        metricName = 'Repetitions';
    } else if (submission.metrics.shuttleTime) {
        score = submission.metrics.shuttleTime;
        unit = 'sec';
        metricName = 'Shuttle Time';
    }

    if (score === undefined) {
        return <p>No score available for this submission.</p>
    }

    const isLowerBetter = test?.slug === 'shuttle-run';
    const scoreFormatted = test?.slug === 'shuttle-run' ? score.toFixed(2) : score;

    return (
        <div className="space-y-6">
            <div className="text-center">
                <p className="text-lg text-muted-foreground">{metricName}</p>
                <p className="text-6xl font-bold font-headline text-primary">
                    {scoreFormatted}
                    <span className="text-2xl text-muted-foreground ml-2">{unit}</span>
                </p>
            </div>

            {benchmark && (
                <div>
                    <h3 className="text-center font-semibold mb-4">Performance Benchmark</h3>
                    <div className="relative h-2 w-full rounded-full bg-secondary">
                        {score !== undefined && (
                            <div 
                                className="absolute top-0 h-2 rounded-full bg-primary"
                                style={{ 
                                    width: `${isLowerBetter ? (benchmark.bronze - score) / (benchmark.bronze - benchmark.gold) * 100 : (score - benchmark.bronze) / (benchmark.gold - benchmark.bronze) * 100}%` 
                                }}
                            >
                                <div className="absolute -top-6 -right-2 text-center text-xs">
                                    <div className="h-4 w-[2px] bg-primary mx-auto"></div>
                                    <p className="font-bold">You</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative mt-2 text-xs text-muted-foreground grid grid-cols-3">
                        <div className="text-left">Bronze: {benchmark.bronze}{unit}</div>
                        <div className="text-center">Silver: {benchmark.silver}{unit}</div>
                        <div className="text-right">Gold: {benchmark.gold}{unit}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
