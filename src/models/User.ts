import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  phone: string;
  countryCode: string;
  email: string;
  password: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  address: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
  };
  role: mongoose.Types.ObjectId;
}

const addressSchema = new Schema({
  address1: { type: String, required: false },
  address2: { type: String },
  city: { type: String, required: false },
  state: { type: String, required: false },
  country: { type: String, required: false },
  pinCode: { type: String, required: false },
});

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  countryCode: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  age: { type: Number, required: false },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: false },
  address: { type: addressSchema, required: false },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: false },
},{timestamps: true});

// Add a unique index on the combination of email and phone
userSchema.index({ email: 1, phone: 1 }, { unique: true });

export default mongoose.model<IUser>('User', userSchema);
