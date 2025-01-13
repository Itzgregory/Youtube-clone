import { Models } from "mongoose"

const subscriptionsDao = (model: Models) => {
    const { subscriptionModel } = model
    return {
        setVideoSubscriber: async (videoTo: string, userTo: string) => {
            const subscription = await subscriptionModel.findOne({ videoTo: videoTo, userTo: userTo })
            
            if (subscription !== null) {
                return await subscription.deleteOne()
            } else {
                const newSubscription = new subscriptionModel({
                    userTo: userTo,
                    videoTo: videoTo,
                })
                return await newSubscription.save()
            }
        },
        getVideosSubscriber: async (userTo: string) => {
            const videos = subscriptionModel.find({ userTo: userTo })
                .populate({
                    path: 'videoTo',
                    populate: {
                        path: 'user'
                    }
                })
                .exec();

            return videos
        },
        deleteSubscriptions: async(videoId: string) => {           
            const deleteVideos = await subscriptionModel.deleteMany({videoTo: videoId})
            return deleteVideos
        }
    }
}

export = subscriptionsDao