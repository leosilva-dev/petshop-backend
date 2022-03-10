import express from 'express';
import { routes } from "./routes/Routes";


const startServer = () => {
    const app = express();
    
    app.use(express.json());
    app.use(routes);
    app.listen(3333);
    
    console.log('\n 🔥 server is runnning on port 3333')

   
}

startServer()