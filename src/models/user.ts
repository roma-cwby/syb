import { Schema, model } from 'mongoose';
import joi from 'joi';

const emailRejex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      match: emailRejex,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      minlength: 6,
      require: true,
    },
    token: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().pattern(emailRejex).required(),
  password: joi.string().min(6).required(),
});

export const loginSchema = joi.object({
  email: joi.string().pattern(emailRejex).required(),
  password: joi.string().min(6).required(),
});

export const User = model('user', UserSchema);
