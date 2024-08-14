'use server';

import { redirect } from 'next/navigation';

import { connectDB } from '@/utils/database';
import { getUserById } from '@/utils/getUser';
import { verifyJWT } from '@/utils/jwtToken';

export const accountActivation = async (token) => {
  console.log(token);

  const result = await connectDB();

  if (!result) {
    return {
      errors: ['Could not connect to the database.'],
    };
  }

  const decoded = verifyJWT(token);

  const user = await getUserById(decoded, 'isValidated');

  if (!user) {
    return { errors: ['No user found.'] };
  }

  if (user.isValidated) {
    return {
      errors: ['Email address already validated. Please try logging in.'],
    };
  }

  user.isValidated = true;

  try {
    await user.save();
  } catch (error) {
    return {
      errors: ['Error validating account.'],
    };
  }

  redirect('/');
};
