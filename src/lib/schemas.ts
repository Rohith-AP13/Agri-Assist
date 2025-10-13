import { z } from "zod";

export const soilDataSchema = z.object({
  nitrogen: z.coerce.number().min(0, "Must be positive").max(200, "Value seems too high"),
  phosphorus: z.coerce.number().min(0, "Must be positive").max(200, "Value seems too high"),
  potassium: z.coerce.number().min(0, "Must be positive").max(200, "Value seems too high"),
  ph: z.coerce.number().min(0, "pH must be between 0 and 14").max(14, "pH must be between 0 and 14"),
  moisture: z.coerce.number().min(0, "Must be positive").max(100, "Must be a percentage"),
  temperature: z.coerce.number().min(-50, "Value seems too low").max(60, "Value seems too high"),
  rainfall: z.coerce.number().min(0, "Must be positive").max(500, "Value seems too high"),
  humidity: z.coerce.number().min(0, "Must be positive").max(100, "Must be a percentage"),
});

export type SoilData = z.infer<typeof soilDataSchema>;
