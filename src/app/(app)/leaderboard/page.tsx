import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { leaderboardData, tests } from "@/lib/data";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LeaderboardPage() {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">
            Leaderboards
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            See how you stack up against the top performers.
          </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Top Performers</CardTitle>
                <CardDescription>
                    Leaderboards are updated daily. All scores are from verified submissions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue={tests[0].slug} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        {tests.map(test => (
                            <TabsTrigger key={test.id} value={test.slug}>{test.name}</TabsTrigger>
                        ))}
                    </TabsList>
                    {tests.map(test => (
                        <TabsContent key={test.id} value={test.slug}>
                            <LeaderboardTable data={leaderboardData[test.slug] || []} />
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
