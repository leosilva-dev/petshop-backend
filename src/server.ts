require('dotenv/config');


import express from 'express';
import { routes } from "./routes/Routes";


const startServer = () => {
    const app = express();
    
    app.use(express.json());
    app.use(routes);
    app.listen(process.env.PORT || 5000);

    console.log('\n 🔥 server is runnning on port '+process.env.PORT)

   
}

if (process.env.NODE_ENV === 'production') {
    //execute migrations
    //startServer();
  } else {
    startServer();
  }