import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordTokenExpiry: Date,
  },
  { timestamp: true },
)

export const User = mongoose.model('User', userSchema)
