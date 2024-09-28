import { z } from "zod";

export const propertiesSchema = z.object({
  text: z.string().min(2).max(500),
});

export type propertiesSchemaType = z.infer<typeof propertiesSchema>;
