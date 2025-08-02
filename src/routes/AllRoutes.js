import express from 'express'
import {authRouter} from './AuthRoutes.js';
import userRouter from './UserRoutes.js';

export const AllRoutes = express.Router();

AllRoutes.use('/auth',authRouter);
AllRoutes.use('/user',userRouter);

