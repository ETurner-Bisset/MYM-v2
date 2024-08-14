import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    userName: String,
    userEmail: String,
    message: String,
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Message =
  mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;
