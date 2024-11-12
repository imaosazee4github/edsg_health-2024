import express from 'express'
import { userLoginController } from '../controllers/authController.js';
import { logoutController } from '../controllers/logoutController.js';


const router = express.Router();




router.post("/login", userLoginController);
router.post("/logout", logoutController);


export default router