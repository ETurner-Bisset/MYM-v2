'use server';

import { redirect } from 'next/navigation';
import mongoose from 'mongoose';
import crypto from 'crypto';

import User from '@/models/userModel';
import { passwordValidation } from '@/utils/inputValidation';
import { hashPassword } from '@/utils/passwordUtils';

export const resetPassword = async (resetToken, formState, formData) => {
  const password = formData.get('password');
  const passwordConfirm = formData.get('passwordConfirm');

  console.log(resetToken);

  const errors = passwordValidation(password, passwordConfirm);

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

  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  let user;
  try {
    user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      return { errors: ['Reset token is invalid or has expired.'] };
    }
    user.password = await hashPassword(password);
    user.passwordConfirm = passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return { errors: ['Something went wrong.'] };
  }

  redirect('/resetSuccess');
};
