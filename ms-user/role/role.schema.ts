import { Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

export const RoleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  permissions: {
    type: [ObjectId],
    ref: 'Permission',
    default: [],
  },
  createdAt: { type: Date, required: true, default: new Date() },
});
