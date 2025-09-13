"use client"

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { tests } from "@/lib/data";

const mockHeatmapData: Record<string, { labels: string[]; series: { name: string; data: number[] }[] }> = {
    'vertical-jump': {
        labels: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai'],
        series: [
            { name: '0-10 cm', data: [5, 1, 2, 3, 0] },
            { name: '10-20 cm', data: [10, 4, 6, 8, 2] },
            { name: '20-30 cm', data: [15, 8, 12, 10, 5] },
            { name: '30-40 cm', data: [8, 15, 10, 5, 8] },
            { name: '40-50 cm', data: [4, 10, 5, 2, 12] },
            { name: '50+ cm', data: [2, 5, 3, 1, 7] },
        ],
    },
    'sit-ups': {
        labels: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai'],
        series: [
            { name: '0-10 reps', data: [3, 2, 1, 4, 1] },
            { name: '10-20 reps', data: [8, 5, 7, 9, 4] },
            { name: '20-30 reps', data: [12, 10, 15, 11, 8] },
            { name: '30-40 reps', data: [10, 15, 12, 8, 12] },
            { name: '40+ reps', data: [5, 8, 6, 3, 10] },
        ],
    },
    'shuttle-run': {
         labels: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai'],
        series: [
            { name: '> 10s', data: [4, 2, 1, 5, 2] },
            { name: '9-10s', data: [9, 6, 5, 10, 6] },
            { name: '8-9s', data: [14, 11, 13, 12, 9] },
            { name: '7-8s', data: [8, 14, 10, 7, 11] },
            { name: '< 7s', data: [3, 7, 6, 2, 8] },
        ],
    },
}

export function Heatmap() {
    const [selectedTest, setSelectedTest] = React.useState(tests[0].slug);
    const data = mockHeatmapData[selectedTest];

    const getColor = (value: number, max: number) => {
        const intensity = value / max;
        if (intensity > 0.8) return 'bg-red-600';
        if (intensity > 0.6) return 'bg-orange-500';
        if (intensity > 0.4) return 'bg-yellow-400';
        if (intensity > 0.2) return 'bg-green-500';
        return 'bg-green-300';
    }
    
    const maxVal = Math.max(...data.series.flatMap(s => s.data));

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle className="font-headline">Submissions Heatmap</CardTitle>
                <CardDescription>
                    Comparing performance distribution across locations.
                </CardDescription>
            </div>
            <div className="w-[200px]">
                <Select value={selectedTest} onValueChange={setSelectedTest}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a test" />
                    </SelectTrigger>
                    <SelectContent>
                        {tests.map(test => (
                            <SelectItem key={test.id} value={test.slug}>{test.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
            <div className="flex">
                <div className="w-24 flex-shrink-0">
                    <div className="h-8"></div>
                    {data.series.map((row, i) => (
                        <div key={i} className="h-10 flex items-center justify-end pr-2 text-sm font-medium text-muted-foreground">{row.name}</div>
                    ))}
                </div>
                <div className="flex-grow">
                    <div className="flex h-8">
                        {data.labels.map((col, i) => (
                            <div key={i} className="w-24 flex-shrink-0 flex items-center justify-center text-sm font-semibold">{col}</div>
                        ))}
                    </div>
                     {data.series.map((row, i) => (
                        <div key={i} className="flex h-10">
                            {row.data.map((value, j) => (
                                <div key={j} className="w-24 flex-shrink-0 p-1">
                                    <div 
                                        className={`${getColor(value, maxVal)} w-full h-full rounded-md flex items-center justify-center text-white font-bold text-sm`}
                                        title={`Value: ${value}`}
                                    >
                                        {value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}