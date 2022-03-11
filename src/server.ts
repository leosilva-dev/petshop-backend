require('dotenv/config');

import express from 'express';
import { routes } from "./routes/Routes";
import {connectToDatabase} from './database/Database'


const startServer = () => {
    const app = express();
    
    app.use(express.json());
    app.use(routes);
    connectToDatabase();
    app.listen(process.env.PORT || 3333);

    console.log('\n 🔥 server is runnning on port '+process.env.PORT)  
}

if (process.env.NODE_ENV === 'production') {
    startServer();
  } else {
    startServer();
  }