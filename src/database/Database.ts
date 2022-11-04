require('dotenv/config');
import  mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

function connectToDatabase(){
mongoose.connect(process.env.MONGODB_URL_CONNECTION as string, {autoIndex:true, autoCreate:true});
  const db = mongoose.connection;

  db.on("error", (error) => console.error('error '+error));
  db.once("open", () => console.log('> database is connected'));
}

export {connectToDatabase}