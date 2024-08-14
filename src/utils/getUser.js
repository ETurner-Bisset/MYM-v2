'use server';

import User from '@/models/userModel';

export const getUserById = async (id, selected) => {
  let user;
  try {
    user = await User.findById(id).select(`+${selected}`);
    return user;
  } catch (error) {
    return null;
  }
};
