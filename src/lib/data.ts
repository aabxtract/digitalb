import type { Blessing, BlessingCategory } from './types';
import { keccak256 } from 'js-sha3';

const generateBlessing = (
  id: number,
  text: string,
  category: BlessingCategory,
  auraColor: string,
  imageUrl: string,
  previousBlessingId?: string
): Blessing => {
  const timestamp = Date.now() - id * 1000 * 60 * 60 * 24; // offset for varied dates
  const creator = `0x${keccak256(text.slice(0, 5)).slice(0, 40)}`;
  const signature = keccak256(text + timestamp + creator);

  return {
    id: String(id),
    text,
    category,
    auraColor,
    creator,
    timestamp,
    signature,
    previousBlessingId: previousBlessingId,
    imageUrl,
  };
};

export const mockBlessings: Blessing[] = [
  generateBlessing(
    1,
    'May you always find light in the darkness and strength in your heart.',
    'Faith',
    '#ADD8E6',
    'https://picsum.photos/seed/dbc1/600/400',
    undefined
  ),
  generateBlessing(
    2,
    'Wishing you the confidence to conquer any mountain that stands in your way.',
    'Confidence',
    '#007BFF',
    'https://picsum.photos/seed/dbc2/600/400',
    '1'
  ),
  generateBlessing(
    3,
    'Sending healing energy for your body, mind, and spirit. May you be whole and well.',
    'Healing',
    '#00C896',
    'https://picsum.photos/seed/dbc3/600/400',
    '2'
  ),
  generateBlessing(
    4,
    'May you be protected from all harm, seen and unseen. You are safe and shielded.',
    'Protection',
    '#663399',
    'https://picsum.photos/seed/dbc4/600/400',
    '3'
  ),
  generateBlessing(
    5,
    'May your heart be filled with an abundance of love, both for yourself and for others.',
    'Love',
    '#FF69B4',
    'https://picsum.photos/seed/dbc5/600/400',
    '4'
  ),
  generateBlessing(
    6,
    'I am grateful for the kindness that surrounds me and the opportunities that await.',
    'Gratitude',
    '#FFD700',
    'https://picsum.photos/seed/dbc6/600/400',
    '5'
  ),
].reverse(); // newest first
