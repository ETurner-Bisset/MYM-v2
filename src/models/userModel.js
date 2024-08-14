import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ['Mr', 'Mrs', 'Miss', 'Dr', 'Mx'],
    },
    name: String,
    email: String,
    password: {
      type: String,
      select: false,
    },
    googleId: String,
    meds: [{ type: mongoose.Types.ObjectId, ref: 'Med' }],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    isValidated: {
      type: Boolean,
      default: false,
      select: false,
    },
    notificationsEnabled: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
