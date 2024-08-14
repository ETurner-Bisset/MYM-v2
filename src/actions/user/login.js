'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { signIn } from 'next-auth/react';
import { loginValidation } from '@/utils/inputValidation';

export const login = async (formState, formData) => {
  const errors = loginValidation(
    formData.get('email'),
    formData.get('password')
  );

  if (errors.length > 0) {
    return {
      errors,
    };
  }

  try {
    const result = await signIn('credentials', {
      redirect: false,
      email: formData.get('email'),
      password: formData.get('password'),
      // callbackUrl: '/meds',
    });
    console.log(result);
    if (result.error) {
      return { errors: [result.error] };
    }
  } catch (error) {
    // console.log(error);
    return {
      errors: [error.message],
    };
  }

  // const result = await signIn('credentials', {
  //   // redirect: false,
  //   email: formData.get('email'),
  //   password: formData.get('password'),
  //   callbackUrl: '/meds',
  // });
  // console.log(result);
  // if (result.error) {
  //   return { errors: [result.error] };
  // }

  revalidatePath('/meds');
  redirect('/meds');
};
