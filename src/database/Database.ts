import  mongoose from "mongoose";
require("dotenv").config();


function connectToDatabase(){
mongoose.connect('mongodb+srv://leonardo:a83RBrYi35Rp4K81@clustermongo.kgrer.mongodb.net/mylinks?retryWrites=true&w=majority', {autoIndex:true, autoCreate:true});
  const db = mongoose.connection;

  db.on("error", (error) => console.error('error'));
  db.once("open", () => console.log("> Database running"));
}

export {connectToDatabase}