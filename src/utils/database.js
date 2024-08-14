import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    return true;
  } catch (error) {
    return false;
  }
};
