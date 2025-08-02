import express from 'express'
import authMiddleWare from '../middleWare/authMiddleWare.js';
import  {userProfile}  from '../controller/userController.js';

const userRouter = express.Router();

userRouter.get('/profile',authMiddleWare,userProfile)
export default userRouter;