'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { analyzePose } from '@/ai/flows/pose-analysis-mockup';
import { addSubmission, benchmarks, mockUser, tests, updateSubmissionStatus } from './data';
import type { Submission } from './types';

// Mock authentication
export async function loginAction() {
  redirect('/dashboard');
}
export async function signupAction() {
  redirect('/dashboard');
}

export async function updateProfileAction(formData: FormData) {
  // In a real app, you'd update the user in the database
  console.log('Profile updated with:', {
    name: formData.get('name'),
    age: formData.get('age'),
    gender: formData.get('gender'),
    height: formData.get('height'),
    location: formData.get('location'),
  });
  return { success: true, message: 'Profile updated successfully!' };
}

export async function performAnalysis(testSlug: string, videoDataUri: string) {
  const test = tests.find((t) => t.slug === testSlug);
  if (!test) {
    throw new Error('Invalid test type');
  }

  try {
    const analysisResult = await analyzePose({
      videoDataUri,
      testType: test.name as 'Vertical Jump' | 'Sit-ups' | 'Shuttle Run',
      location: mockUser.location,
    });

    const newSubmissionId = `sub-${Date.now()}`;

    // Determine badge
    let score: number | undefined;
    let badge;
    const userBenchmark = benchmarks[test.name]?.[mockUser.gender]?.['18-25'];
    if(userBenchmark) {
        if(test.slug === 'vertical-jump') score = analysisResult.metrics.jumpHeight;
        if(test.slug === 'sit-ups') score = analysisResult.metrics.reps;
        if(test.slug === 'shuttle-run') score = analysisResult.metrics.shuttleTime;

        if (score !== undefined) {
            const isLowerBetter = test.slug === 'shuttle-run';
            if (isLowerBetter) {
                if (score <= userBenchmark.gold) badge = 'Gold';
                else if (score <= userBenchmark.silver) badge = 'Silver';
                else if (score <= userBenchmark.bronze) badge = 'Bronze';
            } else {
                if (score >= userBenchmark.gold) badge = 'Gold';
                else if (score >= userBenchmark.silver) badge = 'Silver';
                else if (score >= userBenchmark.bronze) badge = 'Bronze';
            }
        }
    }


    const newSubmission: Submission = {
      id: newSubmissionId,
      userId: mockUser.id,
      testId: test.id,
      testType: test.name as 'Vertical Jump' | 'Sit-ups' | 'Shuttle Run',
      metrics: analysisResult.metrics,
      feedback: analysisResult.feedback,
      status: 'pending',
      videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
      createdAt: new Date().toISOString(),
      badge,
    };

    addSubmission(newSubmission);

    return { submissionId: newSubmissionId };
  } catch (error) {
    console.error('Error during pose analysis:', error);
    return { error: 'Failed to analyze video.' };
  }
}

const statusSchema = z.enum(['verified', 'rejected']);

export async function reviewSubmission(submissionId: string, status: 'verified' | 'rejected') {
    const validatedStatus = statusSchema.parse(status);
    updateSubmissionStatus(submissionId, validatedStatus);
    return { success: true };
}
