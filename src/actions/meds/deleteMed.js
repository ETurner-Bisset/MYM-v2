'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getSession } from '@/utils/getSession';
import { connectDB } from '@/utils/database';
import Med from '@/models/medsModel';

export const deleteMed = async (medId) => {
  const session = await getSession();

  if (!session) {
    return { error: 'You must be logged in to perform that action.' };
  }

  const result = await connectDB();

  if (!result) {
    return {
      error: 'Could not connect to the database.',
    };
  }

  try {
    await Med.findByIdAndDelete(medId);
  } catch (error) {
    return {
      error: 'Could not delete medication.',
    };
  }

  revalidatePath('/meds');
  redirect('/meds');
};
