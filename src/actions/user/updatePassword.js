'use server';

import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';

import User from '@/models/userModel';
import { authOptions } from '@/auth';
import { comparePassword, hashPassword } from '@/utils/passwordUtils';

export const updatePassword = async (passwordCurrent, password) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { errors: ['You must be logged in to perform that action.'] };
  }

  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (error) {
    return {
      errors: ['Could not connect to the database.'],
    };
  }

  let user;

  try {
    user = await User.findById(session.user.id).select('+password');
    if (!user) {
      return { errors: ['No user found.'] };
    }

    const isValid = await comparePassword(passwordCurrent, user.password);

    if (!isValid) {
      return { errors: ['Incorrect credentials.'] };
    } else {
      user.password = await hashPassword(password);
      user.passwordChangedAt = new Date(Date.now());
      await user.save();
      return { message: 'success' };
    }
  } catch (error) {
    user.passwordChangedAt = undefined;
    return { errors: ['Could not update password.'] };
  }
};
