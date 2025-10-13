'use server';

/**
 * @fileOverview A fertilizer suggestion AI agent.
 *
 * - fertilizerSuggestion - A function that suggests the optimal fertilizer for a given crop and soil conditions.
 * - FertilizerSuggestionInput - The input type for the fertilizerSuggestion function.
 * - FertilizerSuggestionOutput - The return type for the fertilizerSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FertilizerSuggestionInputSchema = z.object({
  cropType: z.string().describe('The type of crop to be grown.'),
  nitrogenLevel: z.number().describe('The level of Nitrogen in the soil.'),
  phosphorusLevel: z.number().describe('The level of Phosphorus in the soil.'),
  potassiumLevel: z.number().describe('The level of Potassium in the soil.'),
});
export type FertilizerSuggestionInput = z.infer<typeof FertilizerSuggestionInputSchema>;

const FertilizerSuggestionOutputSchema = z.object({
  fertilizerType: z.string().describe('The recommended type of fertilizer.'),
  fertilizerAmount: z.string().describe('The recommended amount of fertilizer to use.'),
  reasoning: z.string().describe('The reasoning behind the fertilizer suggestion.'),
});
export type FertilizerSuggestionOutput = z.infer<typeof FertilizerSuggestionOutputSchema>;

export async function fertilizerSuggestion(input: FertilizerSuggestionInput): Promise<FertilizerSuggestionOutput> {
  return fertilizerSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fertilizerSuggestionPrompt',
  input: {schema: FertilizerSuggestionInputSchema},
  output: {schema: FertilizerSuggestionOutputSchema},
  prompt: `You are an expert in agriculture, providing advice to farmers on what fertilizer to use on their crops. Based on the soil nutrient levels and the crop type, suggest the optimal type and amount of fertilizer to balance soil nutrients and improve yield while minimizing waste.

Crop Type: {{{cropType}}}
Nitrogen Level: {{{nitrogenLevel}}}
Phosphorus Level: {{{phosphorusLevel}}}
Potassium Level: {{{potassiumLevel}}}

Provide the reasoning for your suggestion.`,
});

const fertilizerSuggestionFlow = ai.defineFlow(
  {
    name: 'fertilizerSuggestionFlow',
    inputSchema: FertilizerSuggestionInputSchema,
    outputSchema: FertilizerSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
