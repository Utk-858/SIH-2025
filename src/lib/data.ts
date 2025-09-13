import { User, Test, Submission, Benchmark, LeaderboardEntry } from './types';
import { TrendingUp, Activity, Repeat } from 'lucide-react';

export const mockUser: User = {
  id: 'user-1',
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  age: 22,
  gender: 'male',
  height: 178,
  avatarUrl: 'https://picsum.photos/seed/user-1/200/200',
  location: 'New Delhi',
};

export const tests: Test[] = [
  {
    id: 'test-1',
    slug: 'vertical-jump',
    name: 'Vertical Jump',
    description: 'Measure your explosive leg power.',
    icon: TrendingUp,
  },
  {
    id: 'test-2',
    slug: 'sit-ups',
    name: 'Sit-ups',
    description: 'Test your abdominal muscle endurance.',
    icon: Activity,
  },
  {
    id: 'test-3',
    slug: 'shuttle-run',
    name: 'Shuttle Run',
    description: 'Assess your speed, agility, and stamina.',
    icon: Repeat,
  },
];

let submissions: Submission[] = [
  {
    id: 'sub-1',
    userId: 'user-1',
    testId: 'test-1',
    testType: 'Vertical Jump',
    metrics: { jumpHeight: 45 },
    feedback: "Your jump height can improve if you bend deeper and explode upwards. Make sure to fully extend your knees.",
    status: 'verified',
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    badge: 'Silver',
  },
  {
    id: 'sub-2',
    userId: 'user-2',
    testId: 'test-2',
    testType: 'Sit-ups',
    metrics: { reps: 38 },
    feedback: "Keep your core engaged throughout the movement. Try not to use your arms for momentum.",
    status: 'pending',
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    badge: 'Gold',
  },
    {
    id: 'sub-3',
    userId: 'user-3',
    testId: 'test-3',
    testType: 'Shuttle Run',
    metrics: { shuttleTime: 7.5 },
    feedback: "Focus on staying low during your turns to maintain speed. Quick, choppy steps can improve your acceleration.",
    status: 'rejected',
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    createdAt: new Date().toISOString(),
    badge: 'Bronze',
  },
];

export const getSubmissions = () => submissions;
export const getSubmissionById = (id: string) => submissions.find(s => s.id === id);
export const addSubmission = (submission: Submission) => {
    submissions.unshift(submission);
};
export const updateSubmissionStatus = (id: string, status: 'verified' | 'rejected') => {
    const sub = submissions.find(s => s.id === id);
    if (sub) {
        sub.status = status;
    }
}
export const getUserSubmissions = (userId: string) => submissions.filter(s => s.userId === userId);


export const benchmarks: Record<string, Record<string, Record<string, Benchmark>>> = {
  'Vertical Jump': {
    male: {
      '18-25': { bronze: 30, silver: 40, gold: 50 }, // higher is better
    },
    female: {
      '18-25': { bronze: 25, silver: 35, gold: 45 },
    },
  },
  'Sit-ups': {
    male: {
      '18-25': { bronze: 15, silver: 25, gold: 35 }, // higher is better
    },
    female: {
      '18-25': { bronze: 10, silver: 20, gold: 30 },
    },
  },
  'Shuttle Run': {
    male: {
      '18-25': { bronze: 10, silver: 8, gold: 6 }, // lower is better
    },
    female: {
      '18-25': { bronze: 11, silver: 9, gold: 7 },
    },
  },
};

export const leaderboardData: Record<string, LeaderboardEntry[]> = {
    'vertical-jump': [
        { rank: 1, user: { name: 'Chris Evans', avatarUrl: 'https://picsum.photos/seed/leader-1/200/200' }, score: '55 cm', submissionId: 'sub-vj-1' },
        { rank: 2, user: { name: 'Scarlett Johansson', avatarUrl: 'https://picsum.photos/seed/leader-2/200/200' }, score: '52 cm', submissionId: 'sub-vj-2' },
        { rank: 3, user: { name: 'Robert Downey Jr.', avatarUrl: 'https://picsum.photos/seed/leader-3/200/200' }, score: '51 cm', submissionId: 'sub-vj-3' },
    ],
    'sit-ups': [
        { rank: 1, user: { name: 'Jane Foster', avatarUrl: 'https://picsum.photos/seed/leader-4/200/200' }, score: '45 reps', submissionId: 'sub-su-1' },
        { rank: 2, user: { name: 'Peter Parker', avatarUrl: 'https://picsum.photos/seed/leader-5/200/200' }, score: '42 reps', submissionId: 'sub-su-2' },
        { rank: 3, user: { name: 'Bruce Banner', avatarUrl: 'https://picsum.photos/seed/leader-6/200/200' }, score: '40 reps', submissionId: 'sub-su-3' },
    ],
    'shuttle-run': [
        { rank: 1, user: { name: 'Wanda Maximoff', avatarUrl: 'https://picsum.photos/seed/leader-7/200/200' }, score: '5.8 sec', submissionId: 'sub-sr-1' },
        { rank: 2, user: { name: 'Steve Rogers', avatarUrl: 'https://picsum.photos/seed/leader-8/200/200' }, score: '6.1 sec', submissionId: 'sub-sr-2' },
        { rank: 3, user: { name: 'Natasha Romanoff', avatarUrl: 'https://picsum.photos/seed/leader-9/200/200' }, score: '6.3 sec', submissionId: 'sub-sr-3' },
    ],
};
