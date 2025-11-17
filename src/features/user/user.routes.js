// 1. Import express.
import express from 'express';
import { upload } from '../../middlewares/fileupload.middleware.js';
import UserController from './user.controller.js';
// 2. Initialize Express router.
const userRouter = express.Router();
const userController = new UserController();

// All the paths to the controller methods.

// userRouter.post(
//     '/signup',
//     userController.signUp
// );

userRouter.post(
    '/signup',
    (req,res)=>{
        userController.signUp(req,res)
    }
);

// userRouter.post(
//     '/signin',
//     userController.signIN
// );

userRouter.post(
    '/signin',
    (req,res)=>{
        userController.signIN(req,res)
    }
);



export default userRouter;