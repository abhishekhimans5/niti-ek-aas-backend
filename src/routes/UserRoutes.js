import express from 'express'
import authMiddleWare from '../middleWare/authMiddleWare.js';
import  {profileSuggestion, userProfile}  from '../controller/userController.js';


const userRouter = express.Router();

userRouter.get('/profile',authMiddleWare,userProfile)
userRouter.get('/profile-suggestion',authMiddleWare,profileSuggestion)
export default userRouter;