require('dotenv/config');

import express from 'express';
import { errors } from "celebrate";
import cors from "cors";

import { routes } from "./routes/Routes";
import {connectToDatabase} from './database/Database'

connectToDatabase();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.listen(3333);
console.log('\n> server is runnning on port 3333')  

    

