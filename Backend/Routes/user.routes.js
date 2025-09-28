import express from 'express'
import { getUser, Login, logOUt, register, updateProfile, upload } from '../Controller/user.controller.js'
import { AuthMiddleware } from '../middleware/Auth.middleware.js'

const userRouter = express.Router()

userRouter.route('/register').post(register)
userRouter.route('/getUser').get(AuthMiddleware, getUser)
userRouter.route('/login').post(Login)
userRouter.route('/logout').post(AuthMiddleware, logOUt)
userRouter.route('/updateProfile').post(AuthMiddleware, upload.single('profilPhoto'), updateProfile)

export default userRouter