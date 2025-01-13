import { Router } from 'express'
export const subscriptionRouter  = Router()
const { subscriptionControllers } = require('../../controllers')

subscriptionRouter.patch('/subscription/set', subscriptionControllers.setVideoSubscriber)
subscriptionRouter.post('/subscription/get', subscriptionControllers.getVideosSubscriber)


