'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getSession } from '@/utils/getSession';
import { connectDB } from '@/utils/database';
import Med from '@/models/medsModel';

export const toggleOrderReminder = async (medId) => {
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

  let updatedMed;

  try {
    updatedMed = await Med.findByIdAndUpdate(
      medId,
      [{ $set: { isOrderReminder: { $not: '$isOrderReminder' } } }],
      { new: true }
    );
  } catch (error) {
    return {
      error: 'Could not update order reminder.',
    };
  }

  revalidatePath(`/meds/${updatedMed.slug}`);
  redirect(`/meds/${updatedMed.slug}`);
};
