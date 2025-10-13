"use server";

import { recommendCrops, CropRecommendationInput } from "@/ai/flows/crop-recommendation-flow";
import { fertilizerSuggestion, FertilizerSuggestionInput } from "@/ai/flows/fertilizer-suggestion-flow";

export async function getCropRecommendationAction(input: CropRecommendationInput) {
  try {
    const result = await recommendCrops(input);
    if (!result || !result.crops || result.crops.length === 0) {
      return { success: false, error: "Could not generate crop recommendations. Please try again." };
    }
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "An unexpected error occurred while getting crop recommendations." };
  }
}

export async function getFertilizerSuggestionAction(input: FertilizerSuggestionInput) {
  try {
    const result = await fertilizerSuggestion(input);
     if (!result || !result.fertilizerType) {
      return { success: false, error: "Could not generate fertilizer suggestion. Please try again." };
    }
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "An unexpected error occurred while getting fertilizer suggestions." };
  }
}
