import { Schema } from 'mongoose';

export const PermissionSchema = new Schema({
  method: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true, default: new Date() },
});
