require('dotenv/config');
import  mongoose from "mongoose";

function connectToDatabase(){
mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@clustermongo.kgrer.mongodb.net/mylinks?retryWrites=true&w=majority`, {autoIndex:true, autoCreate:true});
  const db = mongoose.connection;

  db.on("error", (error) => console.error('error'));
  db.once("open", () => console.log(' 🎲 database is running'));
}

export {connectToDatabase}