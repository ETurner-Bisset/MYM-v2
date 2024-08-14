'use server';

import { redirect } from 'next/navigation';
import mongoose from 'mongoose';
import crypto from 'crypto';

import User from '@/models/userModel';
import { emailValidation } from '@/utils/inputValidation';

export const forgotPassword = async (formState, formData) => {
  const email = formData.get('email');

  const errors = emailValidation(email);

  if (errors.length > 0) {
    return {
      errors,
    };
  }

  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (error) {
    return {
      errors: ['Could not connect to the database.'],
    };
  }

  let user;
  let url;
  try {
    user = await User.findOne({ email: email });

    if (!user) {
      return { errors: ['No user found for that email.'] };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    console.log(resetToken);
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    await user.save();
    url = `http://localhost:3000/forgotPassword/${resetToken}`;
    console.log(url);
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    return { errors: ['Something went wrong.'] };
  }

  redirect('/emailSent');
};
