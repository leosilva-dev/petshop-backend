require('dotenv/config');
import  mongoose from "mongoose";

function connectToDatabase(){
mongoose.connect('mongodb://localhost:27017/mylinks', {autoIndex:true, autoCreate:true});
  const db = mongoose.connection;

  db.on("error", (error) => console.error('error '+error));
  db.once("open", () => console.log('> database is connected'));
}

export {connectToDatabase}