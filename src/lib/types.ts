export const BlessingCategories = ['Faith', 'Confidence', 'Healing', 'Protection', 'Love', 'Gratitude'] as const;
export type BlessingCategory = (typeof BlessingCategories)[number];

export type Blessing = {
  id: string;
  text: string;
  category: BlessingCategory;
  auraColor: string;
  creator: string; // wallet address
  recipient?: string; // wallet address
  timestamp: number;
  signature: string;
  previousBlessingId?: string;
  imageUrl: string;
};
