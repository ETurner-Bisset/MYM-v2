'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { getSession } from '@/utils/getSession';
import { connectDB } from '@/utils/database';
import Med from '@/models/medsModel';
import User from '@/models/userModel';

export const deleteAccount = async () => {
  const session = await getSession();

  if (!session) {
    throw new Error('You must be logged in to perform that action.');
  }

  const result = await connectDB();

  if (!result) {
    throw new Error('Could not connect to the database.');
  }

  try {
    await Med.deleteMany({ userId: session.user.id });
    await User.findByIdAndDelete(session.user.id);
  } catch (error) {
    throw new Error('Could not delete account.');
  }

  revalidatePath('/');
  redirect('/');
};
