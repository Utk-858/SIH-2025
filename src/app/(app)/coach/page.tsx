import { AICoachClient } from "@/components/coach/AICoachClient";

export default function CoachPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">
            Personal AI Coach
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Upload a video of your exercise and chat with your AI coach to get personalized feedback.
          </p>
        </div>
        <AICoachClient />
      </div>
    </div>
  );
}
