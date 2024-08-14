'use server';

import { connectDB } from '@/utils/database';
import Med from '@/models/medsModel';

export const getMedsByUserId = async (userId) => {
  const result = await connectDB();

  if (!result) {
    return {
      errors: ['Could not connect to the database.'],
    };
  }

  let meds;

  try {
    meds = await Med.find({ userId: userId });
  } catch (error) {
    return {
      errors: ['No medications found.'],
    };
  }

  return meds;
};
