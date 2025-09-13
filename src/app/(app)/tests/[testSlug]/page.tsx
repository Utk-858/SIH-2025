import { tests } from "@/lib/data";
import { notFound } from "next/navigation";
import { VideoRecorder } from "@/components/test/VideoRecorder";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function TestPage({ params }: { params: { testSlug: string } }) {
  const test = tests.find((t) => t.slug === params.testSlug);

  if (!test) {
    notFound();
  }

  const Icon = test.icon;

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8 flex flex-col items-center">
        <div className="text-center space-y-2">
            <div className="inline-block p-4 bg-primary/10 rounded-full">
                <Icon className="h-10 w-10 text-primary" />
            </div>
          <h1 className="text-4xl font-bold font-headline tracking-tight">
            {test.name} Test
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Follow the instructions and record a short video of your attempt.
          </p>
        </div>

        <Alert className="max-w-2xl w-full">
            <Info className="h-4 w-4" />
            <AlertTitle className="font-semibold">Recording Instructions</AlertTitle>
            <AlertDescription>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Ensure your full body is visible within the frame.</li>
                    <li>Record in a well-lit area with a plain background.</li>
                    <li>Wear athletic clothing that doesn't obstruct movement.</li>
                    <li>Follow the test instructions carefully for accurate results.</li>
                </ul>
            </AlertDescription>
        </Alert>
        
        <VideoRecorder testSlug={test.slug} />

      </div>
    </div>
  );
}
