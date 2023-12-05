import { Schema, model } from 'mongoose';
import { User } from '../../entities/user';

const usersSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  firstSurname: {
    type: String,
    required: true,
  },
  secondSurname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  profilePic: {
    publicId: String,
    size: Number,
    height: Number,
    width: Number,
    format: String,
    url: String,
  },
});

usersSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export const UserModel = model<User>('User', usersSchema, 'users');
