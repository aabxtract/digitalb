'use server';

import { generateBlessingPreview } from '@/ai/flows/generative-blessing-preview';
import type { GenerateBlessingPreviewInput } from '@/ai/flows/generative-blessing-preview';
import { z } from 'zod';
import { BlessingCategories } from './types';

const inputSchema = z.object({
  blessingText: z.string().min(10, 'Please write a longer blessing.'),
  category: z.enum(BlessingCategories),
});

export async function getBlessingPreview(
  _prevState: any,
  formData: FormData
) {
  const rawData = Object.fromEntries(formData.entries());
  
  const validatedFields = inputSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }

  try {
    const result = await generateBlessingPreview(validatedFields.data as GenerateBlessingPreviewInput);
    return { data: result, error: null };
  } catch (e: any) {
    console.error(e);
    return {
      error: { _form: ['Failed to generate preview. Please try again.'] },
      data: null,
    };
  }
}
