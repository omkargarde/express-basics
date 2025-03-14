import { Router } from 'express'
import {
  loginUser,
  registerUser,
  verifyUser,
} from '../controllers/user.controller.js'

export const userRouter = new Router()

// login
userRouter.post('/login', loginUser)
// register
userRouter.post('/register', registerUser)
// verification, why get
userRouter.get('/verify/:token', verifyUser)
