import express from 'express'
import {SignupUser2, UserLogin2} from "../controllers/authController2.js"

const router = express.Router();

router.post("/usersignup",SignupUser2);
router.post("/userlogin", UserLogin2);

export default router;