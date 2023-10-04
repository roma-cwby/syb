import { IUser } from 'types/user';
import { Schema, model } from 'mongoose';
import { IsEmail, Length, IsInt, Min, Max, length, IsOptional } from 'class-validator';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 3, required: true },
    avatar: { type: String, required: true },
    subscription: { type: String, enum: ['starter', 'pro', 'business'], default: 'starter' },
    token: { type: String, default: '' },
    verificationToken: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

export class CreateUser implements IUser {
  @Length(2, 20)
  name: string;

  @IsEmail()
  email: string;

  @Length(3, 50)
  password: string;

  avatar: string;

  subscription: string;

  @IsOptional()
  token: string;

  verificationToken: string;
}

export const User = model<IUser>('user', userSchema);
