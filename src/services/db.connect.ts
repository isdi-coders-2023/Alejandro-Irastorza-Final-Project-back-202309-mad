import mongoose from 'mongoose';
import 'dotenv/config';
export const dbConnect = () => {
  const user = process.env.USER_DB;
  const password = process.env.PASSWORD_DB;
  const cluster = 'cluster0.8am8bpl.mongodb.net';
  const database = 'Alien-Bar-Database';
  const uri = `mongodb+srv://${user}:${password}@${cluster}/${database}?retryWrites=true&w=majority`; // Esto lo genera mongoDb cuando hacemos un proyecto nuevo después de establecer nuestro usuario y nuestra contraseña.

  return mongoose.connect(uri);
};

// Index será quien levante el servidor.
