'use server';

import { connectDB } from '@/utils/database';
import Med from '@/models/medsModel';

export const getMedBySlug = async (slug) => {
  const result = await connectDB();

  if (!result) {
    return {
      error: 'Could not connect to the database.',
    };
  }

  let med;

  try {
    med = await Med.find({ slug: slug });
  } catch (error) {
    return {
      error: 'No medication found.',
    };
  }

  return JSON.parse(JSON.stringify(med));
};
