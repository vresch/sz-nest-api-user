import { Schema } from 'mongoose';

export const SessionSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  accessToken: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true, default: new Date() },
  expireAt: { type: Date, required: true, expires: 0 },
});
