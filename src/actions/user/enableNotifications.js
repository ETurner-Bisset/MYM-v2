'use server';

import { getSession } from '@/utils/getSession';
import { connectDB } from '@/utils/database';
import { getUserById } from '@/utils/getUser';

export const enableNotifications = async () => {
  const session = await getSession();

  if (!session) {
    return { errors: ['You must be logged in to perform that action.'] };
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

  user.notificationsEnabled = true;

  try {
    await user.save();
  } catch (error) {
    return { errors: ['Could not enable notifications.'] };
  }
};
