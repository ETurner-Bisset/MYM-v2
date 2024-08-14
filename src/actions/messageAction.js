'use server';

import { redirect } from 'next/navigation';

import { connectDB } from '@/utils/database';
import Message from '@/models/messageModel';
import { messageValidation } from '@/utils/inputValidation';

export const contactMessage = async (formData) => {
  const name = formData.get('userName');
  const email = formData.get('userEmail');
  const message = formData.get('message');

  const errors = messageValidation(name, email, message);

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

  try {
    await Message.create({ userName: name, userEmail: email, message });
  } catch (error) {
    console.log(error);
    return {
      errors: ['Could not send messsage.'],
    };
  }

  redirect('/');
};
