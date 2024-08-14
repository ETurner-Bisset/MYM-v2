'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getSession } from '@/utils/getSession';
import { connectDB } from '@/utils/database';
import { getUserById } from '@/utils/getUser';
import { detailsValidation } from '@/utils/inputValidation';

export const updateDetails = async (formData) => {
  const session = await getSession();

  if (!session) {
    return { errors: ['You must be logged in to perform that action.'] };
  }

  const title = formData.get('title');
  const name = formData.get('name');
  const email = formData.get('email');

  const errors = detailsValidation(title, name, email);

  if (errors.length > 0) {
    return {
      errors,
    };
  }

  const result = await connectDB();

  if (!result) {
    return {
      errors: ['Could not connect to the database.'],
    };
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    return { errors: ['No user found.'] };
  }

  try {
    user.title = title;
    user.name = name;
    user.email = email;
    await user.save();
  } catch (error) {
    return { errors: ['Could not update details.'] };
  }

  revalidatePath('/profile');
  redirect('/profile');
};
