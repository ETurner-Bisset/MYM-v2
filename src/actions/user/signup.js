'use server';
import { redirect } from 'next/navigation';
import mongoose from 'mongoose';

import { signupValidation } from '@/utils/inputValidation';
import { hashPassword } from '@/utils/passwordUtils';
import { createJWT } from '@/utils/jwtToken';
import User from '@/models/userModel';

export const signup = async (formState, formData) => {
  const title = formData.get('title');
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const passwordConfirm = formData.get('passwordConfirm');

  const errors = signupValidation(
    title,
    name,
    email,
    password,
    passwordConfirm
  );

  if (errors.length > 0) {
    return {
      errors,
    };
  }

  const hashedPassword = await hashPassword(password);

  const newUser = {
    title,
    name,
    email,
    password: hashedPassword,
  };

  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (error) {
    return {
      errors: ['Could not connect to the database.'],
    };
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return {
      errors: ['Email already exists. Choose another email or try logging in.'],
    };
  }

  let user;
  try {
    user = await User.create(newUser);
  } catch (error) {
    console.log(error);
    return {
      errors: ['Could not create user.'],
    };
  }

  const token = createJWT(user.id);
  const url = `http://localhost:3000/signupConfirm/${token}`;

  console.log(url);
  redirect('/signupConfirm');
};
