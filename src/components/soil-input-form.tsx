"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Droplets, Thermometer, Wind, Waves, TestTube2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { SoilData, soilDataSchema } from "@/lib/schemas";

type SoilInputFormProps = {
  onSubmit: (data: SoilData) => void;
  isSubmitting: boolean;
  setFormData: (data: Partial<SoilData>) => void;
};

export function SoilInputForm({ onSubmit, isSubmitting, setFormData }: SoilInputFormProps) {
  const form = useForm<SoilData>({
    resolver: zodResolver(soilDataSchema),
    defaultValues: {
      nitrogen: 50,
      phosphorus: 50,
      potassium: 50,
      ph: 6.5,
      temperature: 25,
      humidity: 70,
      rainfall: 100,
      moisture: 50,
    },
  });

  const handleSliderChange = (field: keyof SoilData, value: number[]) => {
    form.setValue(field, value[0]);
    setFormData(form.getValues());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.handleChange(e);
    setFormData(form.getValues());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Soil & Environment Analysis</CardTitle>
        <CardDescription>Enter the details of your soil and local climate.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="nitrogen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nitrogen (N)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" onChange={handleInputChange}/>
                    </FormControl>
                    <Slider value={[field.value]} onValueChange={(value) => handleSliderChange('nitrogen', value)} max={200} step={1} />
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="phosphorus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phosphorus (P)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" onChange={handleInputChange} />
                    </FormControl>
                     <Slider value={[field.value]} onValueChange={(value) => handleSliderChange('phosphorus', value)} max={200} step={1} />
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="potassium"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Potassium (K)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" onChange={handleInputChange} />
                    </FormControl>
                    <Slider value={[field.value]} onValueChange={(value) => handleSliderChange('potassium', value)} max={200} step={1} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormField
                control={form.control}
                name="ph"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><TestTube2 /> pH Level</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" step="0.1" onChange={handleInputChange} />
                    </FormControl>
                    <Slider value={[field.value]} onValueChange={(value) => handleSliderChange('ph', value)} max={14} step={0.1} />
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="moisture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Waves /> Soil Moisture (%)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" onChange={handleInputChange} />
                    </FormControl>
                    <Slider value={[field.value]} onValueChange={(value) => handleSliderChange('moisture', value)} max={100} step={1} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Thermometer /> Temperature (°C)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" onChange={handleInputChange} />
                    </FormControl>
                     <Slider value={[field.value]} onValueChange={(value) => handleSliderChange('temperature', value)} min={-20} max={50} step={1} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rainfall"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Droplets /> Rainfall (mm)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" onChange={handleInputChange} />
                    </FormControl>
                    <Slider value={[field.value]} onValueChange={(value) => handleSliderChange('rainfall', value)} max={300} step={1} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="humidity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Wind /> Humidity (%)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" onChange={handleInputChange} />
                    </FormControl>
                    <Slider value={[field.value]} onValueChange={(value) => handleSliderChange('humidity', value)} max={100} step={1} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Get Recommendations"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
