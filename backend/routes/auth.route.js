import express from 'express';
import { signOutController,signinController,signupController } from '../controllers/Auth.Controller.js';
const Router = express.Router();

Router.post("/signup",signupController);
Router.post("/signin",signinController);
Router.get("/signout",signOutController);


export default Router;  