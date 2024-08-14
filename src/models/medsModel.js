import mongoose from 'mongoose';

const medSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    dose: String,
    orderDate: Date,
    frequency: String,
    isOrderReminder: { type: Boolean, default: false },
    firstDose: String,
    secondDose: String,
    thirdDose: String,
    fourthDose: String,
    isDoseReminder: { type: Boolean, default: false },
    pharmacy: String,
    instructions: String,
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Med = mongoose.models.Med || mongoose.model('Med', medSchema);

export default Med;
