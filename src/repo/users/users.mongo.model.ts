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
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'SubAdmin',
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
    delete returnedObject.role;
  },
});

export const UserModel = model<User>('User', usersSchema, 'users');
