'use server';

/**
 * @fileOverview Generates a glowing visual representation of a blessing text.
 *
 * - generateBlessingPreview - A function that handles the generation of the visual blessing preview.
 * - GenerateBlessingPreviewInput - The input type for the generateBlessingPreview function.
 * - GenerateBlessingPreviewOutput - The return type for the generateBlessingPreview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlessingPreviewInputSchema = z.object({
  blessingText: z.string().describe('The blessing text to generate a visual representation for.'),
  category: z
    .enum(['Faith', 'Confidence', 'Healing', 'Protection', 'Love', 'Gratitude'])
    .describe('The category of the blessing.')
    .optional(),
});
export type GenerateBlessingPreviewInput = z.infer<typeof GenerateBlessingPreviewInputSchema>;

const GenerateBlessingPreviewOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated glowing image.'),
  auraColor: z.string().describe('The hex color code of the aura based on the category.'),
});
export type GenerateBlessingPreviewOutput = z.infer<typeof GenerateBlessingPreviewOutputSchema>;

export async function generateBlessingPreview(
  input: GenerateBlessingPreviewInput
): Promise<GenerateBlessingPreviewOutput> {
  return generativeBlessingPreviewFlow(input);
}

const generativeBlessingPreviewPrompt = ai.definePrompt({
  name: 'generativeBlessingPreviewPrompt',
  input: {schema: GenerateBlessingPreviewInputSchema},
  output: {schema: GenerateBlessingPreviewOutputSchema},
  prompt: `Generate a visually stunning and spiritually uplifting image representing the following blessing text: {{{blessingText}}}.

The image should have a warm golden glow and incorporate elements related to the blessing category, if provided.

Category: {{category}}

Based on the category, generate a hex color code for the aura. Here are the aura color rules:
- Confidence -> Blue glow
- Healing -> Teal glow
- Gratitude -> Gold
- Protection -> Deep purple
- Love -> Pink/red
- Faith -> White/light blue

Output the image as a data URI and the aura color as a hex code.`,
});

const generativeBlessingPreviewFlow = ai.defineFlow(
  {
    name: 'generativeBlessingPreviewFlow',
    inputSchema: GenerateBlessingPreviewInputSchema,
    outputSchema: GenerateBlessingPreviewOutputSchema,
  },
  async input => {
    const categoryColors: {[key: string]: string} = {
      Confidence: '#007BFF', // Blue
      Healing: '#00C896', // Teal
      Gratitude: '#FFD700', // Gold
      Protection: '#663399', // Deep purple
      Love: '#FF69B4', // Pink
      Faith: '#ADD8E6', // Light blue
    };

    let auraColor = categoryColors[input.category as string] || '#FFFFFF'; // Default to white

    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `Generate a visually stunning and spiritually uplifting image representing the following blessing text: ${input.blessingText}. The image should have a warm golden glow and incorporate elements related to the following category: ${input.category}. The image should have the aura color ${auraColor}.`,
    });
    return {
      imageUrl: media.url,
      auraColor: auraColor,
    };
  }
);
