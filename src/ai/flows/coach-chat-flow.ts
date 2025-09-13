'use server';
/**
 * @fileOverview A conversational AI agent for coaching.
 *
 * - chatWithCoach - A function that handles the conversational coaching process.
 * - CoachChatInput - The input type for the chatWithCoach function.
 * - CoachChatOutput - The return type for the chatWithCoach function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CoachChatInputSchema = z.object({
  videoDataUri: z
    .string()
    .optional()
    .describe(
      "A video of a user performing an exercise, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'. This is optional."
    ),
  message: z.string().describe("The user's message to the coach."),
  history: z.any().optional().describe('The chat history between the user and the AI coach.'),
});
export type CoachChatInput = z.infer<typeof CoachChatInputSchema>;

export type CoachChatOutput = string;

export async function chatWithCoach(input: CoachChatInput): Promise<CoachChatOutput> {
  return coachChatFlow(input);
}

const coachChatPrompt = ai.definePrompt({
  name: 'coachChatPrompt',
  input: {
    schema: z.object({
      videoDataUri: z.string().optional(),
      message: z.string(),
      history: z.string().optional(),
    }),
  },
  output: {schema: z.string()},
  prompt: `You are a world-class, friendly, and encouraging personal AI athletic coach. Your goal is to help users improve their athletic performance.

{{#if videoDataUri}}
You have been provided with a video of the user's exercise. Analyze their form, identify areas for improvement, and provide specific, actionable feedback in your response.
Video to analyze: {{media url=videoDataUri}}
{{else}}
The user has not provided a video. Engage in a helpful conversation and answer their questions about fitness, exercises, and training principles.
{{/if}}

{{#if history}}
This is the conversation history. Use it to maintain context:
{{{history}}}
{{/if}}

Here is the user's latest message:
"{{{message}}}"

Provide a concise, helpful, and encouraging response.
`,
});

const coachChatFlow = ai.defineFlow(
  {
    name: 'coachChatFlow',
    inputSchema: CoachChatInputSchema,
    outputSchema: z.string(),
  },
  async input => {
    // Format history into a simple string to avoid complex Handlebars logic
    const historyString = (input.history || [])
      .map((msg: { role: string; parts: { text: string }[] }) => {
        // The AI's role is 'model', let's label it as 'Coach' for clarity in the prompt
        const roleLabel = msg.role === 'user' ? 'User' : 'Coach';
        const text = msg.parts[0]?.text || '';
        return `${roleLabel}: ${text}`;
      })
      .join('\n');

    const {output} = await coachChatPrompt({
      ...input,
      history: historyString,
    });
    
    return output || "I'm sorry, I'm not sure how to respond to that. Could you please rephrase?";
  }
);
