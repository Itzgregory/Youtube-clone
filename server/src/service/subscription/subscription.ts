import { subscriptionDao } from "../../interface"

const subscriptionService = ( subscriptionDao: subscriptionDao ) => {
  
    return{
        setVideoSubscriberService: async({videoTo , userTo}: {videoTo: string, userTo: string}) => {
            return await subscriptionDao.setVideoSubscriber(videoTo, userTo)
        },
        getVideoSubscriberService: async({userTo}:{userTo:string}) => {         
            return await subscriptionDao.getVideosSubscriber(userTo)
        },
        deleteSubscriptions: async({videoId}:{videoId: string}) => {
            return await subscriptionDao.deleteSubscriptions(videoId)
        }
    }
}

export =  subscriptionService