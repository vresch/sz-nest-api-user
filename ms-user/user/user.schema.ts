import { Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date() },
});

UserSchema.methods.validatePassword = validatePassword;

async function validatePassword(password: string): Promise<boolean> {
  const hash = await bcrypt.hash(password, this.salt);
  return hash === this.password;
}
