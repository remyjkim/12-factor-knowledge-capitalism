import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    factor: z.number().optional(),
    part: z.string().optional(),
    principle: z.string().optional()
  }),
});

export const collections = { blog };
