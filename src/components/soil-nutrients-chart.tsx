"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { SoilData } from "@/lib/schemas"

const chartConfig = {
  nitrogen: {
    label: "Nitrogen (N)",
    color: "hsl(var(--chart-1))",
  },
  phosphorus: {
    label: "Phosphorus (P)",
    color: "hsl(var(--chart-2))",
  },
  potassium: {
    label: "Potassium (K)",
    color: "hsl(var(--chart-3))",
  },
}

type SoilNutrientsChartProps = {
  data: Partial<SoilData>;
};


export function SoilNutrientsChart({ data }: SoilNutrientsChartProps) {
  const chartData = [
    { nutrient: "Nitrogen (N)", value: data.nitrogen || 0, fill: "var(--color-nitrogen)" },
    { nutrient: "Phosphorus (P)", value: data.phosphorus || 0, fill: "var(--color-phosphorus)" },
    { nutrient: "Potassium (K)", value: data.potassium || 0, fill: "var(--color-potassium)" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Soil Nutrient Balance</CardTitle>
        <CardDescription>Nitrogen, Phosphorus, and Potassium levels (in kg/ha)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="nutrient"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="value" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
