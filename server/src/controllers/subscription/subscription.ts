import { StatusCodes } from "http-status-codes"
import { subscriberService } from "../../interface"
import {Request, Response} from 'express'

const subscriptionController = (subscriptionService: subscriberService) => {
    return {
        setVideoSubscriber: async (req: Request, res: Response) => {         
            const subscription = await subscriptionService.setVideoSubscriberService(req.body)
            if (!subscription) {
                res.status(StatusCodes.BAD_REQUEST).send('an error ocurred')
            }
            res.status(StatusCodes.OK).send(subscription)
        },
         getVideosSubscriber: async(req: Request, res: Response) => {           
            const videos = await subscriptionService.getVideoSubscriberService(req.body)
                     
            if(!videos){
                res.status(StatusCodes.BAD_REQUEST).send('an error occurred while searching for videos')
            }          
            res.status(StatusCodes.OK).send(videos)
        }
      
   }
}

export = subscriptionController