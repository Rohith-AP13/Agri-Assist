"use client";

import { useState, useTransition } from "react";
import { CropRecommendationOutput } from "@/ai/flows/crop-recommendation-flow";
import { FertilizerSuggestionInput, FertilizerSuggestionOutput } from "@/ai/flows/fertilizer-suggestion-flow";
import { getFertilizerSuggestionAction } from "@/app/actions";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Terminal, Sprout, FlaskConical, Loader2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";

type RecommendationsProps = {
  cropData: CropRecommendationOutput | null;
  soilData: FertilizerSuggestionInput;
  isLoading: boolean;
};

const SuitabilityBadge = ({ score }: { score: number }) => {
  if (score > 8) return <Badge variant="default" className="bg-green-600">Excellent</Badge>;
  if (score > 6) return <Badge variant="secondary" className="bg-yellow-500 text-black">Good</Badge>;
  if (score > 4) return <Badge variant="outline" className="bg-orange-500 text-white">Moderate</Badge>;
  return <Badge variant="destructive">Low</Badge>;
};

export function Recommendations({ cropData, soilData, isLoading }: RecommendationsProps) {
  const [isFertilizerLoading, startFertilizerTransition] = useTransition();
  const [fertilizerResult, setFertilizerResult] = useState<FertilizerSuggestionOutput | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGetFertilizer = (cropType: string) => {
    setSelectedCrop(cropType);
    setFertilizerResult(null);
    const input = {
      ...soilData,
      cropType,
    };

    startFertilizerTransition(async () => {
      const result = await getFertilizerSuggestionAction(input);
      if (result.success && result.data) {
        setFertilizerResult(result.data);
      } else {
        toast({
          variant: "destructive",
          title: "Fertilizer Suggestion Failed",
          description: result.error,
        });
      }
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!cropData) {
    return (
      <Card className="flex flex-col items-center justify-center h-full text-center p-8">
        <Sprout className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-xl font-semibold text-muted-foreground">Your Recommendations Await</h3>
        <p className="text-muted-foreground">Fill out the form to get personalized crop and fertilizer suggestions.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Sprout className="text-primary"/> Crop Recommendations</CardTitle>
          <CardDescription>Based on your input, here are the most suitable crops for cultivation.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead>Suitability</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cropData.crops.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.crop}</TableCell>
                  <TableCell><SuitabilityBadge score={item.suitabilityScore} /></TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleGetFertilizer(item.crop)}>
                      <FlaskConical className="mr-2 h-4 w-4" />
                      Fertilizer Plan
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {(isFertilizerLoading || fertilizerResult) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="text-accent" />
              Fertilizer Suggestion for {selectedCrop}
            </CardTitle>
            <CardDescription>Optimal fertilizer plan to balance soil nutrients for {selectedCrop}.</CardDescription>
          </CardHeader>
          <CardContent>
            {isFertilizerLoading && (
              <div className="flex items-center justify-center h-32">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4 text-muted-foreground">Generating fertilizer plan...</p>
              </div>
            )}
            {fertilizerResult && (
              <div className="space-y-4 animate-in fade-in-50 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Recommended Type</AlertTitle>
                    <AlertDescription className="font-bold text-lg text-primary">{fertilizerResult.fertilizerType}</AlertDescription>
                  </Alert>
                   <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Recommended Amount</AlertTitle>
                    <AlertDescription className="font-bold text-lg text-primary">{fertilizerResult.fertilizerAmount}</AlertDescription>
                  </Alert>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2"><Info /> Reasoning</h4>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-md border">{fertilizerResult.reasoning}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
