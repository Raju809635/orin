'use server';

/**
 * @fileOverview Provides an AI chatbot to answer user questions about the Orin platform.
 *
 * - aiHelpChatbot - A function that handles the chatbot interaction.
 * - AIHelpChatbotInput - The input type for the aiHelpChatbot function.
 * - AIHelpChatbotOutput - The return type for the aiHelpChatbot function.
 */

import {ai} from '@/ai';
import {googleAI} from '@genkit-ai/google-genai';
import {z} from 'genkit';

const AIHelpChatbotInputSchema = z.object({
  query: z.string().describe('The user query about the platform.'),
});
export type AIHelpChatbotInput = z.infer<typeof AIHelpChatbotInputSchema>;

const AIHelpChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type AIHelpChatbotOutput = z.infer<typeof AIHelpChatbotOutputSchema>;

export async function aiHelpChatbot(input: AIHelpChatbotInput): Promise<AIHelpChatbotOutput> {
  return aiHelpChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiHelpChatbotPrompt',
  model: googleAI.model('gemini-pro'),
  input: {schema: AIHelpChatbotInputSchema},
  output: {schema: AIHelpChatbotOutputSchema},
  prompt: `You are a chatbot designed to answer user questions about the Orin education mentoring marketplace platform.

  You have knowledge of the platform's features, booking process, pricing, and other relevant information.

  Use the following information to formulate your response:
  - Orin is an education mentoring marketplace.
  - Students can browse and book mentors based on categories, subjects, and exams.
  - Mentors can create profiles, set their availability, and manage bookings.
  - The platform offers real-time chat for communication between students and mentors.
  - The platform commission is 20%.

  Respond to the following user query:
  {{{query}}}
  `,
});

const aiHelpChatbotFlow = ai.defineFlow(
  {
    name: 'aiHelpChatbotFlow',
    inputSchema: AIHelpChatbotInputSchema,
    outputSchema: AIHelpChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
