"use client";

import { useState, useTransition } from "react";

import { SoilInputForm } from "@/components/soil-input-form";
import { Recommendations } from "@/components/recommendations";
import { SoilData } from "@/lib/schemas";
import { getCropRecommendationAction } from "@/app/actions";
import { CropRecommendationOutput } from "@/ai/flows/crop-recommendation-flow";
import { useToast } from "@/hooks/use-toast";
import { SoilNutrientsChart } from "@/components/soil-nutrients-chart";

export default function Dashboard() {
  const [isSubmitting, startTransition] = useTransition();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<Partial<SoilData>>({
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
  });
  const [cropResults, setCropResults] = useState<CropRecommendationOutput | null>(null);

  const handleFormSubmit = (data: SoilData) => {
    setCropResults(null);
    startTransition(async () => {
      const result = await getCropRecommendationAction(data);
      if (result.success && result.data) {
        setCropResults(result.data);
      } else {
        toast({
          variant: "destructive",
          title: "Recommendation Failed",
          description: result.error,
        });
      }
    });
  };

  const soilDataForFertilizer = {
      nitrogenLevel: formData.nitrogen || 0,
      phosphorusLevel: formData.phosphorus || 0,
      potassiumLevel: formData.potassium || 0,
      cropType: "", // This will be set inside the recommendations component
  };

  return (
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <SoilInputForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} setFormData={setFormData} />
        </div>
        <div className="lg:col-span-3 space-y-6">
            <SoilNutrientsChart data={formData} />
            <Recommendations 
              cropData={cropResults} 
              soilData={soilDataForFertilizer}
              isLoading={isSubmitting} 
            />
        </div>
      </div>
  );
}
