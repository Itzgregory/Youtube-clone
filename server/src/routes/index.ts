import { userRouter } from "./user/user";
import { videoRouter } from './videos/videos'

import { Router, urlencoded } from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { subscriptionRouter } from "./subscription/subscription";
import { commentsRouter } from "./comments/comments";


export const Routes = Router()

Routes.use(urlencoded({extended:true}))
Routes.use(cookieParser())
Routes.use(cors({
    credentials: true, origin: 'http://localhost:3000'
}))
Routes.use(helmet())
Routes.use('/', userRouter)
Routes.use('/video', videoRouter)
Routes.use('/', subscriptionRouter)
Routes.use('/', commentsRouter)




