'use server';

/**
 * @fileOverview AI smart search flow for mentors using natural language queries.
 *
 * - aiSmartSearch - A function that handles the smart search for mentors.
 * - AISmartSearchInput - The input type for the aiSmartSearch function.
 * - AISmartSearchOutput - The return type for the aiSmartSearch function.
 */

import {ai} from '@/ai';
import {z} from 'genkit';

const AISmartSearchInputSchema = z.object({
  query: z.string().describe('The natural language query for searching mentors.'),
});
export type AISmartSearchInput = z.infer<typeof AISmartSearchInputSchema>;

const AISmartSearchOutputSchema = z.object({
  filteredResults: z.string().describe('The filtered results generated from AI search queries'),
});
export type AISmartSearchOutput = z.infer<typeof AISmartSearchOutputSchema>;

export async function aiSmartSearch(input: AISmartSearchInput): Promise<AISmartSearchOutput> {
  return aiSmartSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSmartSearchPrompt',
  model: 'googleai/gemini-1.5-flash-latest',
  input: {schema: AISmartSearchInputSchema},
  output: {schema: AISmartSearchOutputSchema},
  prompt: `You are a search assistant for a mentor marketplace.

  Based on the user's natural language query, extract the key criteria for filtering mentors.
  Consider subject, price range, exam type, rating, language, and experience level.
  Return a string that represents the filter criteria that can be applied to search for mentors.

  User Query: {{{query}}} `,
});

const aiSmartSearchFlow = ai.defineFlow(
  {
    name: 'aiSmartSearchFlow',
    inputSchema: AISmartSearchInputSchema,
    outputSchema: AISmartSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
