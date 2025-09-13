'use server';
/**
 * @fileOverview A mocked pose analysis AI agent.
 *
 * - analyzePose - A function that handles the pose analysis process.
 * - AnalyzePoseInput - The input type for the analyzePose function.
 * - AnalyzePoseOutput - The return type for the analyzePose function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePoseInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video of a user performing a test, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  testType: z.enum(['Vertical Jump', 'Sit-ups', 'Shuttle Run']).describe('The type of test being performed.'),
  location: z.string().optional().describe('The location where the test is being performed, which may affect environmental factors like gravity.'),
});
export type AnalyzePoseInput = z.infer<typeof AnalyzePoseInputSchema>;

const AnalyzePoseOutputSchema = z.object({
  metrics: z.object({
    reps: z.number().optional().describe('The number of repetitions performed (for Sit-ups).'),
    jumpHeight: z.number().optional().describe('The estimated jump height in centimeters (for Vertical Jump).'),
    shuttleTime: z.number().optional().describe('The estimated time in seconds (for Shuttle Run).'),
  }).describe('The performance metrics from the test'),
    feedback: z.string().describe('Coaching tips and feedback based on the user\'s performance.'),
});
export type AnalyzePoseOutput = z.infer<typeof AnalyzePoseOutputSchema>;

export async function analyzePose(input: AnalyzePoseInput): Promise<AnalyzePoseOutput> {
  return analyzePoseFlow(input);
}

const analyzePoseFlow = ai.defineFlow(
  {
    name: 'analyzePoseFlow',
    inputSchema: AnalyzePoseInputSchema,
    outputSchema: AnalyzePoseOutputSchema,
  },
  async input => {
    // Mocked analysis for demo purposes.
    // In a real app, the location would be used to adjust physics calculations.
    console.log(`Analyzing test for ${input.testType} at location: ${input.location || 'Not provided'}`);
    
    let reps = undefined;
    let jumpHeight = undefined;
    let shuttleTime = undefined;
    let feedback = '';

    switch (input.testType) {
      case 'Sit-ups':
        reps = Math.floor(Math.random() * 6) + 5; // Random between 5 and 10
        feedback = "Keep your core engaged throughout the movement. Try not to use your arms for momentum.";
        break;
      case 'Vertical Jump':
        jumpHeight = Math.floor(Math.random() * 21) + 30; // Random between 30 and 50
        feedback = "Your jump height can improve if you bend deeper and explode upwards. Make sure to fully extend your knees.";
        break;
      case 'Shuttle Run':
        shuttleTime = (Math.random() * 5) + 5; // Random between 5 and 10
        feedback = "Focus on staying low during your turns to maintain speed. Quick, choppy steps can improve your acceleration.";
        break;
    }

    if (input.location?.toLowerCase().includes('moon')) {
        if(jumpHeight) jumpHeight *= 6;
        feedback += ' Performance adjusted for lunar gravity.';
    }

    return {
      metrics: {
        reps,
        jumpHeight,
        shuttleTime,
      },
      feedback,
    };
  }
);
