import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/User.js"
import { signup, login, isAuth } from '../controllers/UserController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();

//Signup Route
router.post("/signup", signup )

//Login Route
router.post("/login", login )

router.get("/is-auth", authMiddleware, isAuth)

export default router;