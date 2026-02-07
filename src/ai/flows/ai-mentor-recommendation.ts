'use server';

/**
 * @fileOverview An AI agent that recommends mentors to students based on their academic goals, class level, and exam targets.
 *
 * - recommendMentors - A function that recommends mentors based on student profile data.
 * - RecommendMentorsInput - The input type for the recommendMentors function.
 * - RecommendMentorsOutput - The return type for the recommendMentors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendMentorsInputSchema = z.object({
  academicGoals: z
    .string()
    .describe('The academic goals of the student.'),
  classLevel: z.string().describe('The current class level of the student.'),
  examTargets: z.array(z.string()).describe('The target exams for the student.'),
});
export type RecommendMentorsInput = z.infer<typeof RecommendMentorsInputSchema>;

const RecommendMentorsOutputSchema = z.object({
  mentorRecommendations: z
    .array(
      z.object({
        mentorId: z.string().describe('The ID of the recommended mentor.'),
        matchPercentage: z
          .number()
          .describe('The percentage match between the student and the mentor.'),
        reason: z.string().describe('Reason why the mentor was recommended.'),
      })
    )
    .describe('A list of recommended mentors with their match percentages.'),
});
export type RecommendMentorsOutput = z.infer<typeof RecommendMentorsOutputSchema>;

export async function recommendMentors(
  input: RecommendMentorsInput
): Promise<RecommendMentorsOutput> {
  return recommendMentorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendMentorsPrompt',
  input: {schema: RecommendMentorsInputSchema},
  output: {schema: RecommendMentorsOutputSchema},
  prompt: `You are an AI mentor recommendation system. You will be provided with a student's academic goals, class level, and exam targets.
  Based on this information, you will recommend mentors that are best suited for the student.

  Student Academic Goals: {{{academicGoals}}}
  Student Class Level: {{{classLevel}}}
  Student Exam Targets: {{#each examTargets}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Please provide a list of mentor recommendations with their match percentages and reasoning.
  `,
});

const recommendMentorsFlow = ai.defineFlow(
  {
    name: 'recommendMentorsFlow',
    inputSchema: RecommendMentorsInputSchema,
    outputSchema: RecommendMentorsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
