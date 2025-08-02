import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import connectMongoDB from './src/config/connectMongoDB.js';
import {AllRoutes} from './src/routes/AllRoutes.js';
import { responseFormatter } from './src/middleWare/responseFormatter.js';
import cookieParser from 'cookie-parser';



dotenv.config();
const port = process.env.PORT || 3001;
const server = express();

server.use(cors({
  origin: 'http://localhost:3000',  // ✅ must be exact frontend origin (no '*')
  credentials: true                // ✅ allows cookies to be sent
}));
server.use(express.json());
server.use(cookieParser());
server.use(responseFormatter)
server.use('/',AllRoutes);

server.listen(port, async()=> {
    const isConnected = await connectMongoDB(); 
    if(isConnected){
        console.log("server started...");
    }else{
        console.log("Failed to start server...");
    }
    
});


