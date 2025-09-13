import { LucideIcon } from "lucide-react";

export type User = {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // in cm
  avatarUrl: string;
  location?: string;
};

export type Test = {
  id: string;
  slug: 'vertical-jump' | 'sit-ups' | 'shuttle-run';
  name: string;
  description: string;
  icon: LucideIcon;
};

export type Submission = {
  id: string;
  userId: string;
  testId: string;
  testType: 'Vertical Jump' | 'Sit-ups' | 'Shuttle Run';
  metrics: {
    reps?: number;
    jumpHeight?: number; // cm
    shuttleTime?: number; // seconds
  };
  feedback: string;
  status: 'pending' | 'verified' | 'rejected';
  videoUrl: string;
  createdAt: string; // ISO string
  badge?: 'Bronze' | 'Silver' | 'Gold';
};

export type Benchmark = {
  bronze: number;
  silver: number;
  gold: number;
};

export type LeaderboardEntry = {
  rank: number;
  user: Pick<User, 'name' | 'avatarUrl'>;
  score: string;
  submissionId: string;
};
