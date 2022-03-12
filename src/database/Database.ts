require('dotenv/config');
import  mongoose from "mongoose";

function connectToDatabase(){
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clustermongo.kgrer.mongodb.net/mylinks?retryWrites=true&w=majority`, {autoIndex:true, autoCreate:true});
  const db = mongoose.connection;

  db.on("error", (error) => console.error('error '+error));
  db.once("open", () => console.log(' 🎲 database is running'));
}

export {connectToDatabase}