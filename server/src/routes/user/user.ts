import { Router } from 'express'
const { userControllers } = require('../../controllers')
export const userRouter  = Router()

userRouter.get('/logout', userControllers.logoutUser)
userRouter.get('/user', userControllers.getLogedUser)
userRouter.get('/login/google', userControllers.createUser)
userRouter.get('/google/redirect', userControllers.callbackUser)

