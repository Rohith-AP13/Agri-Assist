'use server';

/**
 * @fileOverview Recommends suitable crops based on soil and environmental conditions.
 *
 * - recommendCrops - A function that recommends crops based on input conditions.
 * - CropRecommendationInput - The input type for the recommendCrops function.
 * - CropRecommendationOutput - The return type for the recommendCrops function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropRecommendationInputSchema = z.object({
  nitrogen: z.number().describe('Nitrogen level in the soil.'),
  phosphorus: z.number().describe('Phosphorus level in the soil.'),
  potassium: z.number().describe('Potassium level in the soil.'),
  ph: z.number().describe('pH level of the soil.'),
  moisture: z.number().describe('Moisture level in the soil.'),
  temperature: z.number().describe('Temperature of the environment.'),
  rainfall: z.number().describe('Rainfall in the area.'),
  humidity: z.number().describe('Humidity of the environment.'),
});
export type CropRecommendationInput = z.infer<typeof CropRecommendationInputSchema>;

const CropRecommendationOutputSchema = z.object({
  crops: z.array(
    z.object({
      crop: z.string().describe('The recommended crop.'),
      suitabilityScore: z.number().describe('A score indicating the suitability of the crop (higher is better).'),
      rationale: z.string().describe('The rationale behind the crop recommendation.')
    })
  ).describe('A ranked list of suitable crops for the given conditions.')
});
export type CropRecommendationOutput = z.infer<typeof CropRecommendationOutputSchema>;

export async function recommendCrops(input: CropRecommendationInput): Promise<CropRecommendationOutput> {
  return recommendCropsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropRecommendationPrompt',
  input: {schema: CropRecommendationInputSchema},
  output: {schema: CropRecommendationOutputSchema},
  prompt: `You are an expert agricultural advisor. A farmer has provided the following soil and environmental conditions:

Soil Nutrients:
- Nitrogen: {{nitrogen}}
- Phosphorus: {{phosphorus}}
- Potassium: {{potassium}}
- pH: {{ph}}
- Moisture: {{moisture}}

Environmental Parameters:
- Temperature: {{temperature}}
- Rainfall: {{rainfall}}
- Humidity: {{humidity}}

Based on these conditions, recommend the top suitable crops for cultivation. Provide a suitability score and rationale for each crop.

Ensure that the output is a ranked list of crops, with the most suitable crop listed first.

Follow the schema to make sure your output is valid. The descriptions in the schema are meant to be followed literally.

Response:
`,
});

const recommendCropsFlow = ai.defineFlow(
  {
    name: 'recommendCropsFlow',
    inputSchema: CropRecommendationInputSchema,
    outputSchema: CropRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
