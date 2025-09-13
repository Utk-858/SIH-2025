import { ProfileForm } from "@/components/profile/ProfileForm";
import { mockUser } from "@/lib/data";

export default function ProfilePage() {
  return (
    <div className="container max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">
            Your Profile
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Manage your personal information.
          </p>
        </div>
        <ProfileForm user={mockUser} />
      </div>
    </div>
  );
}
